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

  const showAlert = () => {
    WebApp.showAlert("Simple alert");
  };

  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className='Card'>
          <b>Your platform</b>
          <div className='Hint'>{WebApp.platform}</div>
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

        <a onClick={() => {
          showAlert()
        }}>
          Show simple alert
        </a>

        {connected && (
          <a onClick={() => {
            sendIncrement()
          }}>
            Increment by 5
          </a>
        )}

        <br/>

        {connected && (
          <a onClick={() => {
            sendDeposit()
          }}>
            Request deposit of 1 TON
          </a>
        )}

        <br/>

        {connected && (
          <a onClick={() => {
            sendWithdrawalRequest()
          }}>
            Send withdrawal request of 1 TON
          </a>
        )}
      </div>
    </div>
  );
}

export default App;