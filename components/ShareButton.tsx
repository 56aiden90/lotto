import { AppContext } from "@lib/context";
import { Button } from "antd";
import { ButtonProps } from "antd/lib/button";
import React, { useContext } from "react";

const ShareButton = (props: ButtonProps) => {
    const { appMessage } = useContext(AppContext);
    const onShare = () => {
        try {
            const url = window.location.href;
            const title = window.document.title;
            if (window.navigator.share) {
                window.navigator.share({ title, url });
            } else {
                const t = document.createElement("textarea");
                document.body.appendChild(t);
                t.value = url;
                t.select();
                document.execCommand("copy");
                document.body.removeChild(t);
                appMessage.success("주소가 복사되었습니다.");
            }
        } catch (error) {
            console.error(error);
            appMessage.error("정상적으로 공유되지 않았습니다.");
        }
    };
    return (
        <Button onClick={onShare} size="large" type="primary" {...props}>
            공유하기
        </Button>
    );
};

export default ShareButton;
