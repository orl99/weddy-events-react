import { useEffect, useRef, useState } from "react";
import { useZxing } from "react-zxing";
import './scanner.scss';


export const BarcodeScanner = (props: {start: boolean}) => {
    // const componentWillUnmount = useRef(false)

    const [result, setResult] = useState("");
    
    const { ref, start, stop} = useZxing({
            onResult(result) {
                setResult(result.getText());
                console.log('result', result);
            },
        });
    
    useEffect(() => {
        if(props.start) {
            start();
        } else {
            stop();
        }
    }, [props]);

    // useEffect(() => {
    //     if(props.start) {
    //         start();
    //     } else {
    //         stop();
    //     }
    // }, []);

    return (
    <>
        <video className="scanner-video" ref={ref} />
        <p>
            <span>Last result:</span>
            <span>
                {result ? (
                    <>
                        QR Verified
                    </>
                )
                    :(
                    <>
                        Could not ready QR code
                    </>
                )
                }
            </span>
        </p>
    </>
    );
};