import BarcodeScannerComponent from 'react-qr-barcode-scanner';

const barcodeHandler = (err: any, result: any) => {
    console.log(result);
}
export const BarcodeScanner = () =>{
    return(
        <>
        <div>hello</div>
            <BarcodeScannerComponent
                width={500}
                height={500}
                onUpdate={(err: any, result: any) => barcodeHandler(err, result)}
            />
        </>
    )
}