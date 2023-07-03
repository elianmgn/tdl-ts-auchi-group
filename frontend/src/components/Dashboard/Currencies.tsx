import React from "react";
import { Grid } from "@mui/material";
import MiniCard from "./MiniCard";

const GetCurrencyExchange = async () => {
  try {
    const response = await fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales');
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

type CurrenciesProps = {
  balance: number;
};

interface Casa {
  nombre: string;
  venta: string;
}

interface CurrencyExchange {
  casa: Casa;
}

export default function Currencies(props: CurrenciesProps) {
  const { balance } = props;
  const [currencyExchange, setCurrencyExchange] = React.useState<CurrencyExchange[] | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    GetCurrencyExchange().then((data) => {
      setCurrencyExchange(data);
    });
    setIsLoading(false);
  }, []);

  return (
    <>
    {isLoading ? <div>Loading...</div> : 
      <>
        {
          currencyExchange ?
            <Grid container p={2} gap={5} justifyContent='center'>
              <Grid item xs={2.5}>
                <MiniCard balance={balance} currencyName={currencyExchange[0].casa.nombre} currencyValue={currencyExchange[0].casa.venta}/>
              </Grid>
              <Grid item xs={2.5}>
                <MiniCard balance={balance} currencyName={currencyExchange[1].casa.nombre} currencyValue={currencyExchange[1].casa.venta}/>
              </Grid>
              <Grid item xs={2.5}>
                <MiniCard balance={balance} currencyName={currencyExchange[3].casa.nombre} currencyValue={currencyExchange[3].casa.venta}/>
              </Grid>
              <Grid item xs={2.5}>
                <MiniCard balance={balance} currencyName={currencyExchange[6].casa.nombre} currencyValue={currencyExchange[6].casa.venta}/>
              </Grid>
            </Grid>
            :
            null
        }
      </>
    }
  </>
  )
}