import React from 'react';
import { Tooltip } from 'antd';
import { Chains } from '@ant-design/web3-common';
import useProvider from '../hooks/useProvider';
import useCurrentAccount from '../hooks/useCurrentAccount';
import { Address } from '../address';

export interface BrowserLinkProps {
  icon?: boolean | React.ReactNode;
  ellipsis?: boolean;
  address?: string;
  href?: string;
}

export const BrowserLink: React.FC<BrowserLinkProps> = (props) => {
  const { icon, ellipsis, address, href } = props;
  const { provider } = useProvider();

  const { account } = useCurrentAccount();

  const mergedAddress = (address || account?.address) ?? '';
  const mergedHref = href || `${provider?.chain ?? Chains.EthereumMainnet}${mergedAddress}`;

  return (
    <Tooltip title={mergedAddress}>
      <a href={mergedHref}>{icon || <Address ellipsis={ellipsis} address={mergedAddress} />}</a>
    </Tooltip>
  );
};