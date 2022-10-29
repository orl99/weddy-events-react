import { useEffect } from "react";
import { useZxing } from "react-zxing";
import './scanner.scss';


export const BarcodeScanner = (props: {start: boolean, emitBarcodeResult: Function}) => {
    
    const { ref, start, stop} = useZxing({
        onResult(result) {
            props.emitBarcodeResult(result.getText());
        },
    });
    
    useEffect(() => {
        if(props.start) {
            start();
        } else {
            stop();
        }
    }, [props]);

    return (
    <>
        <video className="scanner-video" ref={ref} />
    </>
    );
};