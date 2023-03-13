import React, { useCallback, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../utils/Helpers/connectors';
import styled from 'styled-components';
import { AiOutlineDisconnect, AiFillCloseSquare } from 'react-icons/ai';
import { TbMoodCry } from 'react-icons/tb';
import {FiExternalLink} from 'react-icons/fi';
import Button from '../ui/Button';
import LoadingDots from '../ui/LoadingDots';
import useFocusTrap from '@charlietango/use-focus-trap';

interface DialogProps {
  showDialog: boolean;
  handleDialog: () => void;
}

const Dialog = ({ showDialog, handleDialog }: DialogProps) => {
  const { active, account, library, chainId, activate, deactivate } =
    useWeb3React();
  const [hasWallet, setHasWallet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState<number>(0);
  const [accountId, setAccountId] = useState<string>('');
  const dialogRef = useFocusTrap(showDialog);

  const handleAccount = useCallback((value: string | undefined | null) => {
    if (value) {
      const accountValue = value.toString();
      setAccountId(`${accountValue.slice(0, 4)} ... ${accountValue.slice(-4)}`);
    }
  }, []);

  // check if wallet is installed
  useEffect(() => {
    if (window.ethereum) {
      setHasWallet(true);
    }
  }, []);

  const handleConnectWallet = async () => {
    setIsLoading(true);
    try {
      await activate(injected);
    } catch (ex) {}
    setIsLoading(false);
  };

  const getChainBalance = useCallback(async () => {
    if (!library) return;
    const balance = await library.eth.getBalance(account);
    // one wei is 10^-18 ETH
    // function to convert wei
    setBalance(library.utils.fromWei(balance));
  }, [library, account]);

  useEffect(() => {
    getChainBalance();
    handleAccount(account);
  }, [account, handleAccount, getChainBalance]);

  const handleDisconnectWallet = () => {
    try {
      deactivate();
    } catch (ex) {}
  };

  return (
    <StyledModal open={showDialog} onClick={handleDialog}>
      <div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-labelledby="WalletDialog"
        aria-describedby="Connect your wallet dialog"
        aria-modal="true"
        onClick={(e) => {
          e?.stopPropagation();
        }}
      >
        <button
          className="close-btn"
          onClick={handleDialog}
          role="button"
          aria-label={`close dialog`}
          aria-pressed="false"
        >
          <AiFillCloseSquare size={30} />
        </button>
        <h1>Wallet Details</h1>
        <hr />
        {!hasWallet && (
          <>
            <TbMoodCry size={100} />
            <p role="caption" tabIndex={0}>
              Wallet not found. Please click the link below to know more about Getting started with
              Metamask.
            </p>
            <a
              href="https://support.metamask.io/hc/en-us/articles/360015489531-Getting-started-with-MetaMask"
              target="_blank"
              tabIndex={0}
              role="link"
            >
              Open MetaMask Guide <FiExternalLink size={15}/>
            </a>
          </>
        )}

        {hasWallet && !active && (
          <>
            <AiOutlineDisconnect size={100} />
            <p role="caption" tabIndex={0}>
              Wallet not connected. Click below to connect your wallet.
            </p>
            <Button
              label="Connect Wallet"
              variant="outlined"
              onClick={handleConnectWallet}
              loading={isLoading}
            />
          </>
        )}

        {active && (
          <>
            <table
              role="table"
              summary="A table with your current MetaMask wallet details."
              aria-labelledby="WalletDetails"
              aria-describedby="Your MetaMask wallet details."
              tabIndex={0}
            >
              <thead>
                <tr>
                  <th tabIndex={0}>KEY</th>
                  <th tabIndex={0}>VALUE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td tabIndex={0}>Account</td>
                  <td tabIndex={0}>
                    {accountId ? accountId : <LoadingDots />}
                  </td>
                </tr>
                <tr>
                  <td tabIndex={0}>Chain ID</td>
                  <td tabIndex={0}>{chainId ? chainId : <LoadingDots />}</td>
                </tr>
                <tr>
                  <td tabIndex={0}>Balance</td>
                  <td tabIndex={0}>{balance ? balance : <LoadingDots />}</td>
                </tr>
              </tbody>
            </table>
            <Button
              label="Disconnect Wallet"
              variant="outlined"
              type="error"
              onClick={handleDisconnectWallet}
            />
          </>
        )}
      </div>
    </StyledModal>
  );
};

export default Dialog;

// styles
interface StyleProps {
  open: boolean;
}

const StyledModal = styled.div<StyleProps>`
  @keyframes slideDialog {
    from {
      transform: translateY(-200px);
    }
    to {
      transform: translateY(0px);
    }
  }

  position: absolute;
  display: ${(props) => (props.open ? 'flex' : 'none')};
  background: ${(props) => props.theme.dialogBackground};
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 1;

  .modal {
    width: 65%;
    background: ${(props) => props.theme.plainBackground};
    border-radius: 10px;
    padding: 30px;
    display: flex;
    gap: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: 0.5s;
    animation: slideDialog 0.5s;
    z-index: 9;

    @media (max-width: 767px) {
      width: 95%;
    }

    h1 {
      font-size: 2rem;
      margin: 0;
    }

    hr {
      width: 100%;
      margin: 0;
    }
  }

  .close-btn {
    border: none;
    outline: none;
    background: none;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 10px;
    right: 10px;

    &:focus {
      outline: 1px solid ${(props) => props.theme.text};
      outline-offset: 1px;
    }

    svg {
      color: ${(props) => props.theme.text};
    }
  }

  table {
    width: 90%;

    tr {
      display: flex;
      justify-content: space-between;
      gap: 10px;
    }

    tr td:last-child {
      word-wrap: anywhere;
      text-align: right;
    }

    tr td,
    tr th {
      padding-top: 15px;
    }

    tr th {
      text-decoration: underline;
    }
  }
`;
