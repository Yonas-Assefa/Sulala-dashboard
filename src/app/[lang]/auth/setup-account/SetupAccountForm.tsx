"use client";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { setupAccount } from "@/actions/auth/setup-account";
import { EMPTY_FORM_STATE, FormState } from "@/utils/formStateHelper";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useRedirectRoute } from "@/hooks/useRedirectRoute";
import { useCreateQueryString } from "@/hooks/useCreateQueryString";
import { useSetupAccountStore } from "@/providers/setup-account-store-provider";
import FileInput from "@/components/common/form/FileInput";
import CustomMultiSelectInput from "@/components/common/form/SelectInput";
import TextInput from "@/components/common/form/TextInput";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import ProfileImagePicker from "@/components/common/form/ProfileImagePicker";
import { useTranslations } from "next-intl";

function SetupAccountStageOne({
  formState,
  show,
  personalInfo,
}: {
  formState: FormState;
  show: boolean;
  personalInfo: any;
}) {
  const { first_name, last_name, email, setFirstName, setLastName, setEmail } =
    useSetupAccountStore((state) => state);
  const t = useTranslations("Auth");

  return (
    <section
      className={`flex flex-col gap-5 w-full items-stretch ${!show && "hidden"}`}
    >
      <TextInput
        defaultValue={first_name}
        value={first_name}
        setValue={setFirstName}
        label={t("what_is_your_first_name")}
        placeholder={t("enter_your_first_name")}
        id="first_name"
        name="first_name"
        error={formState.fieldErrors?.first_name?.[0]}
      />
      <TextInput
        defaultValue={last_name}
        value={last_name}
        setValue={setLastName}
        label={t("what_is_your_last_name")}
        placeholder={t("enter_your_last_name")}
        id="last_name"
        name="last_name"
        error={formState.fieldErrors?.last_name?.[0]}
      />
      <TextInput
        defaultValue={personalInfo?.email || email}
        disabled={personalInfo?.email?.length > 0}
        value={email}
        setValue={setEmail}
        label={t("what_is_your_email_address")}
        placeholder={t("enter_your_email_address")}
        id={"email"}
        name={"email"}
        error={formState.fieldErrors?.email?.[0]}
      />
    </section>
  );
}

function SetupAccountStageTwo({
  formState,
  categoryLists,
  show,
}: {
  formState: FormState;
  categoryLists: any;
  show: boolean;
}) {
  const {
    campany_name,
    sales_category,
    address,
    setSalesCategory,
    setAddress,
    setCompanyName,
  } = useSetupAccountStore((state) => state);
  const data = categoryLists;

  const t = useTranslations("Auth");

  return (
    <section
      className={`flex flex-col gap-5 w-full items-stretch ${!show && "hidden"}`}
    >
      <TextInput
        defaultValue={campany_name}
        value={campany_name}
        setValue={setCompanyName}
        label={t("what_is_your_company_name")}
        placeholder={t("enter_your_company_name")}
        id="company_name"
        name="company_name"
        error={formState.fieldErrors?.name?.[0]}
      />
      <CustomMultiSelectInput
        defaultValue={sales_category}
        setValue={setSalesCategory}
        label={t("please_choose_categories_for_sale")}
        placeholder={t("choose_categories")}
        id="sale_category"
        name="sale_category"
        error={formState.fieldErrors?.categories?.[0]}
        data={data}
        multi
      />
      <TextInput
        defaultValue={address}
        value={address}
        setValue={setAddress}
        label={t("what_is_your_legal_address")}
        placeholder={t("enter_your_legal_address")}
        id="address"
        name="address"
        error={formState.fieldErrors?.legal_address?.[0]}
      />
    </section>
  );
}

function SetupAccountStageThree({
  formState,
  show,
}: {
  formState: FormState;
  show: boolean;
}) {
  const [certificate, SetCertificate] = React.useState<FileList | null>(null);
  const [taxForm, SetTaxForm] = React.useState<FileList | null>(null);

  const t = useTranslations("Auth");

  const handleCertificate = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetCertificate(e.target.files);
  };

  const handleTaxForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetTaxForm(e.target.files);
  };

  return (
    <section
      className={`flex flex-col gap-5 w-full items-start ${!show && "hidden"}`}
    >
      {/* <ProfileImagePicker id='profile_image' name='profile_image' error={formState?.fieldErrors?.profile_photo?.[0]} /> */}
      <h4 className="font-semibold">{t("please_upload_documents")}</h4>
      <FileInput
        label={t("please_attach_the_certificates")}
        handleFile={handleCertificate}
        file={certificate}
        accept={[".pdf", "image/*"]}
        id="certificate"
        name="certificate"
        error={formState.fieldErrors?.certificates?.[0]}
      />
      <FileInput
        label={t("please_attach_the_tax_section")}
        handleFile={handleTaxForm}
        file={taxForm}
        accept={[".pdf", "image/*"]}
        id="tax_form"
        name="tax_form"
        error={formState.fieldErrors?.tax_forms?.[0]}
      />
    </section>
  );
}

function SetupAccountForm({
  categoryLists,
  activeStage,
  personalInfo,
}: {
  categoryLists: any;
  personalInfo: any;
  activeStage: string;
}) {
  // const { createQueryStringAndPush } = useCreateQueryString()

  // const handleNext = () => {
  //     const nextStage = activeStage === 'one' ? 'two' : 'three'
  //     createQueryStringAndPush('stage', nextStage)
  // }

  const [formState, action] = useFormState(setupAccount, EMPTY_FORM_STATE);

  useToastMessage(formState);
  useRedirectRoute(formState);

  const t = useTranslations("Auth");

  return (
    <form action={action}>
      <SetupAccountStageOne
        formState={formState}
        show={activeStage === "one"}
        personalInfo={personalInfo}
      />
      <SetupAccountStageTwo
        formState={formState}
        categoryLists={categoryLists}
        show={activeStage === "two"}
      />
      <SetupAccountStageThree
        formState={formState}
        show={activeStage === "three"}
      />
      <input
        type="text"
        name="stage"
        id="stage"
        hidden
        value={activeStage}
        onChange={() => {}}
      />
      <div className="flex flex-col items-stretch gap-3 w-full my-6">
        <PrimaryButton name={t("continue")} type={"submit"} />
        <p className="text-black font-semibold text-center">
          {t("you_agree_to_terms_and_conditions")}
          <span className="text-primary">{t("terms_conditions")}</span>
        </p>
      </div>
    </form>
  );
}

export default SetupAccountForm;
