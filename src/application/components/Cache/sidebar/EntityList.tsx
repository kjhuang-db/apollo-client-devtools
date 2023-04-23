import { css } from "@emotion/react";
import { List } from "@apollo/space-kit/List";
import { ListItem } from "@apollo/space-kit/ListItem";
import { colors } from "@apollo/space-kit/colors";
import { rem } from "polished";

import { useTheme } from "../../../theme";
import { getRootCacheIds } from "../common/utils";

const listStyles = css`
  font-family: monospace;
  color: ${colors.silver.lighter};

  > div {
    height: ${rem(32)};
    font-size: ${rem(13)};
  }
`;

const redashStyles = css`
  background-color: #FF5224;
  padding: 2px;
  display: inline-block;
  margin-right: 2px;
  border-radius: 2px
`

function RedashItem({listCacheId}) {
  const [typeName, id ] = listCacheId.split(':');
  return <><span css={redashStyles}>{typeName}</span>{id}</>
}

export function EntityList({ data, cacheId, setCacheId, searchResults = {} }) {
  const theme = useTheme();
  const ids = getRootCacheIds(data);
  const idHits = Object.keys(searchResults);
  return (
    <List
      css={listStyles}
      selectedColor={theme.sidebarSelected}
      hoverColor={theme.sidebarHover}
    >
      {ids.map((listCacheId: string, index) => {
        return (
          <ListItem
            key={`${listCacheId}-${index}`}
            onClick={() => setCacheId(listCacheId)}
            selected={listCacheId === cacheId}
            highlighted={idHits.includes(listCacheId)}
          >
            {
              listCacheId.toLowerCase().includes('redash') ? <RedashItem listCacheId={listCacheId} /> : listCacheId
            }
          </ListItem>
        );
      })}
    </List>
  );
}
