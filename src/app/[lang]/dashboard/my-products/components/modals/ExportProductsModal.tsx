"use client";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import React from "react";
import { pushSuccessNotification } from "@/utils/pushNotification.util";
import { mkConfig, generateCsv, download } from "export-to-csv";
import TextInput from "@/components/common/form/TextInput";
import { closeModal } from "@/lib/modals";
import { useTranslations } from "next-intl";
import { Console } from "@/lib/print";

type Props = {
  exportData: any[];
};

function ExportProductsModal({ exportData }: Props) {
  const [csvFileName, setCsvFileName] = React.useState(
    `products_(${new Date().toLocaleDateString()}).csv`,
  );

  const t = useTranslations("Products");

  const prepareExportData = (data: any[]) => {
    return data.map((item) => {
      return {
        category: item.category_value,
        title: item.title,
        price: item.price,
        description: item.description,
        inventory: item.inventory,
        status: item.status,
      };
    });
  };

  const downloadCsv = () => {
    const cleanedExportData = prepareExportData(exportData);
    const trimmedFileName = csvFileName.endsWith(".csv")
      ? csvFileName.slice(0, -4)
      : csvFileName;
    const csvConfig = mkConfig({
      useKeysAsHeaders: true,
      filename: trimmedFileName,
    });
    const csv = generateCsv(csvConfig)(cleanedExportData);
    download(csvConfig)(csv);
    pushSuccessNotification(`${t("downloaded_csv_file")} ${csvFileName}`);
    Console.info(`${t("downloaded_csv_file")} ${trimmedFileName}.csv`);
    closeModal("export_products_modal");
  };

  return (
    <dialog id="export_products_modal" className="modal">
      <div className="modal-box w-11/12 max-w-sm bg-white px-0">
        <div className="border-b-2 border-gray-200 pb-3">
          <h3 className="font-bold text-xl text-black text-center font-serif">
            {t("export_to_csv")}
          </h3>
        </div>
        <div className="px-5 flex flex-col gap-3 mt-4">
          <TextInput
            label={t("file_name")}
            value={csvFileName}
            setValue={setCsvFileName}
            defaultValue={csvFileName}
            placeholder="example.csv"
          />
          <PrimaryButton
            disabled={!(csvFileName?.length > 0)}
            name={t("export")}
            handleClick={downloadCsv}
          />
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button className="text-black"></button>
      </form>
    </dialog>
  );
}

export default ExportProductsModal;
