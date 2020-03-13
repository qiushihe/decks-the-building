import React from "react";
import PropTypes from "prop-types";

import BaseTooltip from "/src/component/tooltip/base";
import { MenuBase, MenuItem } from "/src/component/tooltip/base-menu";

export class StackMenu extends React.PureComponent {
  render() {
    const {
      tooltipId,
      target,
      addCardsToStack,
      combineDuplicateCards,
      renameStack,
      createStack,
      removeStack,
      exportCards
    } = this.props;

    return (
      <BaseTooltip
        tooltipId={tooltipId}
        target={target}
        region="bottom"
        padded={false}
      >
        <MenuBase>
          <MenuItem onClick={renameStack}>Rename Stack</MenuItem>
          <MenuItem onClick={addCardsToStack}>Add Cards to Stack</MenuItem>
          <MenuItem onClick={combineDuplicateCards}>
            Combine Cards in Stack
          </MenuItem>
          <MenuItem onClick={removeStack}>Delete Stack</MenuItem>
          <MenuItem onClick={createStack}>Create Stack</MenuItem>
          <MenuItem onClick={exportCards}>Export Cards</MenuItem>
        </MenuBase>
      </BaseTooltip>
    );
  }
}

StackMenu.propTypes = {
  tooltipId: PropTypes.string,
  target: PropTypes.object,
  addCardsToStack: PropTypes.func,
  combineDuplicateCards: PropTypes.func,
  renameStack: PropTypes.func,
  createStack: PropTypes.func,
  removeStack: PropTypes.func,
  exportCards: PropTypes.func
};

StackMenu.defaultProps = {
  tooltipId: "",
  target: {},
  addCardsToStack: () => {},
  combineDuplicateCards: () => {},
  renameStack: () => {},
  createStack: () => {},
  removeStack: () => {},
  exportCards: () => {}
};

export default StackMenu;
