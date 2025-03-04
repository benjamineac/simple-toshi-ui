import React from 'react';
import { Typography } from '@material-ui/core';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks';
import { FindQuery } from './__generated__/FindQuery.graphql';
import { findQuery } from './Find';
import { useHistory } from 'react-router-dom';

interface FindResultProps {
  queryRef: PreloadedQuery<FindQuery, Record<string, unknown>>;
}

const FindResult: React.FC<FindResultProps> = ({ queryRef }: FindResultProps) => {
  const data = usePreloadedQuery<FindQuery>(findQuery, queryRef);
  const history = useHistory();

  React.useEffect(() => {
    if (data?.node) {
      const nodeType = data?.node?.__typename;
      switch (nodeType) {
        case 'GeneralTask':
        case 'RuptureGenerationTask':
          history.push(`/${nodeType}/${data?.node?.id}`);
          break;
        case 'File':
          history.push(`/FileDetail/${data?.node?.id}`);
          break;
        case 'InversionSolution':
          history.push(`/InversionSolution/${data?.node?.id}`);
          break;
        default:
          break;
      }
    }
  }, [data]);

  if (!data?.node) {
    return (
      <Typography variant="h5" gutterBottom>
        Id Not Found
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Valid object
      </Typography>
      <Typography>Id: {data?.node?.id}</Typography>
      <Typography>Type: {data?.node?.__typename}</Typography>
    </>
  );
};

export default FindResult;
