import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme } from '@theme/global';
import PaymentCredito from '@components/Payments/credito';
import PaymentPix from '@components/Payments/pix';
export default function DonatePaymentScreen({ navigation, route }) {
    const { value, type } = route.params;
    return (
        <Main>
            <Scroll>
                <Column>

                    {type == 'Crédito' && <PaymentCredito value={value} />}
                    {type == 'Pix' && <PaymentPix value={value}/>}
                    {type == 'Boleto' && <PaymentCredito value={value}/>}
                </Column>
            </Scroll>
        </Main>
    )
}