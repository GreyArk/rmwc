// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { getProviderOptions } from '../Provider';
import { simpleTag, withRipple } from '../Base';
import { Icon } from '../Icon';

import type { SimpleTagPropsT } from '../Base';
import type { WithRipplePropsT } from '../Base';
import type { RMWCProviderOptionsT } from '../Provider';

type ListItemPropsT = {
  /** A modifier for a selected state. */
  selected?: boolean,
  /** A modifier for an active state. */
  activated?: boolean,
  /** A modifier for a selected item in Permanent Drawer. */
  permanentDrawerSelected?: boolean,
  /** A modifier for a selected item in Persistent Drawer. */
  persistentDrawerSelected?: boolean,
  /** A modifier for a selected item in Temporary Drawer. */
  temporaryDrawerSelected?: boolean
} & SimpleTagPropsT &
  WithRipplePropsT;

export const ListItemRoot = withRipple(
  simpleTag({
    displayName: 'ListItemRoot',
    classNames: props => [
      'mdc-list-item',
      {
        'mdc-list-item--selected': props.selected,
        'mdc-list-item--activated': props.activated,
        'mdc-permanent-drawer--selected': props.permanentDrawerSelected,
        'mdc-persistent-drawer--selected': props.persistentDrawerSelected,
        'mdc-temporary-drawer--selected': props.temporaryDrawerSelected
      }
    ],
    defaultProps: {
      permanentDrawerSelected: false,
      persistentDrawerSelected: false,
      temporaryDrawerSelected: false
    },
    consumeProps: [
      'selected',
      'activated',
      'permanentDrawerSelected',
      'persistentDrawerSelected',
      'temporaryDrawerSelected'
    ]
  })
);

/**
 * The ListItem component.
 */
export class ListItem extends React.Component<ListItemPropsT> {
  static displayName = 'ListItem';

  static defaultProps = {
    permanentDrawerSelected: false,
    persistentDrawerSelected: false,
    temporaryDrawerSelected: false
  };

  componentWillMount() {
    this.providerOptions = getProviderOptions(this.context);
  }

  static contextTypes = {
    RMWCOptions: PropTypes.object
  };

  providerOptions: RMWCProviderOptionsT;
  context: Object;

  render() {
    const { listItemDefaultRipple } = this.providerOptions;
    const { ripple, ...rest } = this.props;
    const shouldRipple = ripple === undefined ? listItemDefaultRipple : ripple;
    const rippleProps = shouldRipple ?
      { ripple: true, needsRippleSurface: false } :
      {};
    return <ListItemRoot {...rippleProps} {...rest} />;
  }
}

export const ListItemText = simpleTag({
  displayName: 'ListItemText',
  tag: 'span',
  classNames: 'mdc-list-item__text'
});

export const ListItemSecondaryText = simpleTag({
  displayName: 'ListItemSecondaryText',
  tag: 'span',
  classNames: 'mdc-list-item__secondary-text'
});

export const ListItemStartDetail = simpleTag({
  displayName: 'ListItemStartDetail',
  classNames: 'mdc-list-item__start-detail',
  tag: Icon
});

export const ListItemEndDetail = simpleTag({
  displayName: 'ListItemStartDetail',
  classNames: 'mdc-list-item__end-detail',
  tag: Icon
});

export const ListGroup = simpleTag({
  displayName: 'ListGroup',
  classNames: 'mdc-list-group'
});

export const ListGroupSubheader = simpleTag({
  displayName: 'ListGroupSubheader',
  classNames: 'mdc-list-group__subheader'
});

export const ListDivider = simpleTag({
  displayName: 'ListDivider',
  classNames: 'mdc-list-divider'
});

type ListPropsT = {
  /** Reduces the padding on List items. */
  dense?: boolean,
  /** Gives more space for dual lined list items. */
  twoLine?: boolean,
  /** Makes the list start detail circular for avatars. */
  avatarList?: boolean
} & SimpleTagPropsT;

export class List extends simpleTag({
  displayName: 'List',
  classNames: props => [
    'mdc-list',
    {
      'mdc-list--dense': props.dense,
      'mdc-list--two-line': props.twoLine,
      'mdc-list--avatar-list': props.avatarList
    }
  ],
  defaultProps: {
    dense: false,
    twoLine: false,
    avatarList: false
  },
  consumeProps: ['dense', 'twoLine', 'avatarList']
})<ListPropsT> {
  render() {
    return super.render();
  }
}

export default List;
