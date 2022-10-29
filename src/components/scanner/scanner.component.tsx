/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useZxing } from "react-zxing";
import './scanner.scss';


export const BarcodeScanner = (props: {start: boolean, emitBarcodeResult: Function}) => {
    
    const { ref, start, stop} = useZxing({
        timeBetweenDecodingAttempts: 3000,
        onResult: (result) => {
            props.emitBarcodeResult(result.getText());
            stop();
        }
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