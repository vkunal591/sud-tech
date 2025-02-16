import JsBarcode from "jsbarcode";
import { useEffect, useRef } from "react";

interface BarcodeGeneratorProps {
  barcodeValue: string;
}

const BarcodeGenerator: React.FC<BarcodeGeneratorProps> = ({
  barcodeValue,
}) => {
  const barcodeRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (barcodeRef.current && barcodeValue) {
      JsBarcode(barcodeRef.current, barcodeValue, {
        format: "CODE128",
        displayValue: true,
      });
    }
  }, [barcodeValue]);

  return <svg ref={barcodeRef} />;
};

export default BarcodeGenerator;
