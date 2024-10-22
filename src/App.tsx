import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import { fromNano } from "@ton/core";
import { useTonConnect } from "./hooks/useTonConnect";
import WebApp from "@twa-dev/sdk";


function App() {
  const {
    contract_address,
    counter_value,
    // @ts-ignore
    recent_sender,
    // @ts-ignore
    owner_address,
    contract_balance,
    sendIncrement, 
    sendDeposit, 
    sendWithdrawalRequest
  } = useMainContract();

  const { connected } = useTonConnect();

  const showAlert = (alert: string) => {
    WebApp.showAlert(alert);
  };

  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className='Card'>
          <b>Our contract Address</b>
          <div className='Hint'>{contract_address}</div>
          <b>Our contract Balance</b>
          {contract_balance && (
          <div className='Hint'>{fromNano(contract_balance)}</div>
          )}
        </div>

        <div className='Card'>
          <b>Counter Value</b>
          <div>{counter_value ?? "Loading..."}</div>
        </div>

        <br/>

        <button onClick={() => {
          showAlert("Simple alert")
        }}>
          Show simple alert
        </button>

        <br/>

        <button onClick={() => {
          showAlert(WebApp.colorScheme)
        }}>
          Show your theme
        </button>

        <br/>

        <button onClick={() => {
          showAlert(WebApp.platform)
        }}>
          Show your platform
        </button>

        <br/>

        {connected && (
          <button onClick={() => {
            sendIncrement()
          }}>
            Increment by 5
          </button>
        )}

        <br/>

        {connected && (
          <button onClick={() => {
            sendDeposit()
          }}>
            Request deposit of 1 TON
          </button>
        )}

        <br/>

        {connected && (
          <button onClick={() => {
            sendWithdrawalRequest()
          }}>
            Send withdrawal request of 1 TON
          </button>
        )}
      </div>
    </div>
  );
}

export default App;