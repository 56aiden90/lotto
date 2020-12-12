import React, {Component} from 'react';
import { AppProps } from 'next/app';

export default function Layout(props:any): React.ReactNode{
    return (
        <div>
            {props.children}
        </div>
    )
}

