"use client";
import { Link } from "@/i18n/navigation";
import React, {
  useEffect,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import { Actions, ActionOptions } from "../../../types/table.type";
import { usePathname } from "@/i18n/navigation";
import { useCreateQueryString } from "@/hooks/useCreateQueryString";
import { openModal } from "@/lib/modals";
import { useToastMessage } from "@/hooks/useToastMessage";
import { EMPTY_FORM_STATE, FormState } from "@/utils/formStateHelper";
import { useRedirectRoute } from "@/hooks/useRedirectRoute";

type Props = Actions & {
  product: any;
  actionOptions?: ActionOptions;
};
function TableActions({
  edit,
  detail,
  delete: deleteItem,
  promote,
  is_promoted,
  product,
  toggle,
  actionOptions,
}: Props) {
  const { createQueryString } = useCreateQueryString();
  const [formState, setFormState] = useState(EMPTY_FORM_STATE);
  const pathname = usePathname();
  const [toggleValue, setToggleValue] = useState({
    checked:
      product[actionOptions?.toggle?.key as string] ==
      actionOptions?.toggle?.active,
  });
  const [optimisticToggleValue, addOptimisticToggleValue] = useOptimistic(
    toggleValue,
    (state, newOptimisticValue: boolean) => {
      return {
        ...state,
        checked: newOptimisticValue,
      };
    },
  );
  const [isPending, startTransition] = useTransition();

  useToastMessage(formState);
  useRedirectRoute(formState);

  const promotion_id = Array.isArray(product?.promotion_campaigns)
    ? product?.promotion_campaigns?.[0]?.id
    : product?.promotion_campaigns?.id;

  const getEditLink = () => {
    let link: string;

    if (actionOptions && actionOptions.edit) {
      if (actionOptions.edit.params) {
        link = actionOptions.edit.params.absolute
          ? actionOptions.edit.params.value
          : pathname + actionOptions.edit.params.value;
      } else {
        link = pathname + "/edit/";
      }
      if (actionOptions.edit.searchParams) {
        const searchParams = actionOptions.edit.searchParams.map((ele) => {
          if (ele.value && typeof ele.value === "string")
            return { key: ele.key, value: ele.value };
          else if (ele.fromItem) {
            if (
              ele.fromItem.valueDict &&
              ele.fromItem.valueDict.length > 0 &&
              ele.fromItem.itemKey &&
              typeof ele.fromItem.itemKey == "string"
            ) {
              const product_key = product[
                ele.fromItem.itemKey as keyof typeof product
              ] as string;
              const itemValue =
                ele.fromItem.valueDict?.find((dict) => dict.key == product_key)
                  ?.value || "";
              return {
                key: ele.key,
                value: itemValue,
              };
            } else {
              return {
                key: ele.key,
                value: product[
                  ele.fromItem.itemKey as keyof typeof product
                ] as string,
              };
            }
          } else {
            return {
              key: "",
              value: "",
            };
          }
        });
        link = link + createQueryString(searchParams);
      } else {
        link =
          link +
          createQueryString([
            { key: "item", value: product.id },
            { key: "type", value: "product" },
          ]);
      }

      return link;
    }

    return (
      pathname +
      "/edit/" +
      createQueryString([
        { key: "item", value: product.id },
        { key: "type", value: "product" },
      ])
    );
  };

  const getDetailLink = () => {
    return (
      pathname +
      "/detail/" +
      createQueryString([
        { key: "item", value: product.id },
        { key: "type", value: "product" },
      ])
    );
  };

  const handleToogle = async () => {
    addOptimisticToggleValue(!toggleValue.checked);
    startTransition(async () => {
      if (toggle && actionOptions?.toggle) {
        const formData = new FormData();
        const toInclude = actionOptions.toggle.formData || [];
        toInclude.map((fd) => {
          formData.append(fd.formDataKey, product[fd.itemKey]);
        });
        actionOptions.toggle.action(formData).then((res: FormState) => {
          setFormState(res);
          if (res.status === "SUCCESS") {
            setToggleValue({ checked: !toggleValue.checked });
          }
        });
      }
    });
  };

  return (
    <td>
      <div className="flex flex-row gap-4">
        <div className="flex flex-row gap-2">
          {toggle && actionOptions?.toggle && (
            <div className="flex flex-row gap-2">
              <input
                checked={optimisticToggleValue.checked}
                disabled={isPending}
                onChange={handleToogle}
                type="checkbox"
                className="transition-all toggle [--tglbg:lightgray] checked:[--tglbg:green] bg-white hover:bg-white border-[#d3d3d3] checked:border-[#218000]"
              />
            </div>
          )}
          {edit && (
            <Link
              href={getEditLink() as any}
              className="tooltip"
              data-tip="edit item"
            >
              <img src="/icons/edit.svg" alt="" className="min-w-[20px]" />
            </Link>
          )}
          {detail && (
            <Link
              href={getDetailLink() as any}
              onClick={() => openModal("view_item_table_modal")}
              className="tooltip"
              data-tip="see detail"
            >
              <img
                src="/icons/file-minus.svg"
                alt=""
                className="min-w-[20px]"
              />
            </Link>
          )}
          {deleteItem && (
            <Link
              href={
                createQueryString([{ key: "item", value: product.id }]) as any
              }
              onClick={() => openModal("delete_item_table_modal")}
              className="tooltip"
              data-tip="delete item"
            >
              <img src="/icons/delete.svg" alt="" className="min-w-[20px]" />
            </Link>
          )}
        </div>
        {promote && (
          <Link
            href={
              is_promoted
                ? `/dashboard/promotion/edit?type=product&tab=discounts-ads&item=${promotion_id}`
                : (`/dashboard/promotion/add?type=product&tab=discounts-ads&product=${product.id}` as any)
            }
            className={`flex flex-row gap-2 ${!is_promoted && "transition-all"}`}
          >
            <img
              src={
                is_promoted
                  ? "/icons/whatshot_green.svg"
                  : "/icons/whatshot.svg"
              }
              alt=""
            />
            <p
              className={`${is_promoted ? "text-primary" : "text-gray-800"} font-semibold`}
            >
              {is_promoted ? "Promoted" : "Promote"}
            </p>
          </Link>
        )}
      </div>
    </td>
  );
}

export default TableActions;
