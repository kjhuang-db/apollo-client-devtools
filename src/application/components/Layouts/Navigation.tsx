import React, { ReactNode } from "react";
import { makeVar, useReactiveVar } from "@apollo/client";
import { css } from "@emotion/react";
import { rem } from "polished";
import { colors } from "@apollo/space-kit/colors";
import { ApolloLogo } from "@apollo/space-kit/icons/ApolloLogo";

export enum Screens {
  Cache = "cache",
  Queries = "queries",
  Mutations = "mutations",
  Explorer = "explorer",
}

type NavButtonProps = {
  children: ReactNode;
  isSelected: boolean;
  onClick: any;
};

export type NavigationProps = {
  queriesCount: number;
  mutationsCount: number;
};

const navigationStyles = css`
  grid-area: nav;
  display: flex;
  align-items: center;
  box-shadow: 0 ${rem(-1)} 0 0 rgba(255, 255, 255, 0.3) inset;
  background-color: var(--primary);
  height: 2.5rem;
`;

const selectedNavButtonStyles = css`
  color: ${colors.silver.lighter};
  box-shadow: 0 ${rem(-2)} 0 0 ${colors.silver.lighter} inset;
`;

const navButtonStyles = css`
  appearance: none;
  margin: 0 ${rem(10)};
  padding: ${rem(12)} 0;
  font-size: ${rem(13)};
  border: none;
  background-color: transparent;
  color: var(--whiteTransparent);
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    color: ${colors.silver.lighter};
  }

  &:focus {
    outline: none;
  }
`;

const listStyles = css`
  display: flex;
  align-items: center;
  margin: 0 ${rem(5)};
  padding: 0;
  list-style: none;
`;

const logoLinkStyles = css`
  display: block;
`;

const logoStyles = css`
  width: ${rem(24)};
  height: auto !important;
  margin: 0 ${rem(16)};
  color: ${colors.silver.lighter};
`;

const borderStyles = css`
  border-right: ${rem(1)} solid var(--whiteTransparent);
`;

const dblogoStyles = css`
  color: white;
  margin-left: -${rem(18)};;
  margin-right: ${rem(16)};
`

const NavButton = ({
  isSelected,
  onClick,
  children,
}: NavButtonProps) => (
  <button
    css={[navButtonStyles, isSelected && selectedNavButtonStyles]}
    onClick={onClick}
  >
    {children}
  </button>
);

export const currentScreen = makeVar<Screens>(Screens.Queries);

export const Navigation: React.FC<NavigationProps> = ({
  queriesCount,
  mutationsCount,
}) => {
  const selected = useReactiveVar<Screens>(currentScreen);
  const isSelected = (NavButton: Screens) => selected === NavButton;
  const onNavigate = (screen: Screens) => currentScreen(screen);

  return (
    <nav css={navigationStyles}>
      <div css={borderStyles}>
        <a
          href="https://go.apollo.dev/c/docs"
          target="_blank"
          title="Apollo Client developer documentation"
          css={logoLinkStyles}
          rel="noreferrer"
        >
          <ApolloLogo css={logoStyles} />
          <svg width="24" height="24" viewBox="0 0 24 24" css={dblogoStyles}>
            <path fill="currentColor" d="M.95 14.184L12 20.403l9.919-5.55v2.21L12 22.662l-10.484-5.96l-.565.308v.77L12 24l11.05-6.218v-4.317l-.515-.309L12 19.118l-9.867-5.653v-2.21L12 16.805l11.05-6.218V6.32l-.515-.308L12 11.974L2.647 6.681L12 1.388l7.76 4.368l.668-.411v-.566L12 0L.95 6.27v.72L12 13.207l9.919-5.55v2.26L12 15.52L1.516 9.56l-.565.308Z"></path>
          </svg>
        </a>
      </div>
      <ul css={listStyles}>
        <li>
          <NavButton
            isSelected={isSelected(Screens.Explorer)}
            onClick={() => onNavigate(Screens.Explorer)}
          >
            Explorer
          </NavButton>
        </li>
        <li>
          <NavButton
            isSelected={isSelected(Screens.Queries)}
            onClick={() => onNavigate(Screens.Queries)}
          >
            Queries ({queriesCount})
          </NavButton>
        </li>
        <li>
          <NavButton
            isSelected={isSelected(Screens.Mutations)}
            onClick={() => onNavigate(Screens.Mutations)}
          >
            Mutations ({mutationsCount})
          </NavButton>
        </li>
        <li>
          <NavButton
            isSelected={isSelected(Screens.Cache)}
            onClick={() => onNavigate(Screens.Cache)}
          >
            Cache
          </NavButton>
        </li>
      </ul>
    </nav>
  );
};
