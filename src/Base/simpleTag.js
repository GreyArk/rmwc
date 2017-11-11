// @flow
import * as React from 'react';
import { default as classNamesFunc } from 'classnames';
import { parseThemeOptions } from './withTheme';

type SimpleTagFactoryT = {
  tag?: string | React.ComponentType<any>,
  classNames?: string | (Object => mixed),
  defaultProps?: Object,
  consumeProps?: string[],
  wrap?: boolean,
  name?: string
};

export type SimpleTagPropsT = {
  tag?: string | React.ComponentType<any>,
  className?: string,
  wrap?: boolean,
  elementRef?: React.Ref<*>,
  theme?: string | string[],
  children?: React.Node
};

export const simpleTag = <T>({
  name = 'SimpleTag',
  defaultProps = {},
  consumeProps = [],
  tag: defaultTag = 'div',
  wrap: defaultWrap = false,
  classNames
}: SimpleTagFactoryT): React.ComponentType<T & SimpleTagPropsT> => {
  class SimpleTag extends React.Component<T & SimpleTagPropsT> {
    static defaultProps = {
      ...defaultProps,
      tag: defaultTag
    };

    render() {
      const {
        tag,
        className,
        wrap = false,
        elementRef,
        theme,
        ...rest
      } = this.props;

      // choose the tag we are going to render
      const Tag = tag || defaultTag;

      // consume any props that shouldnt be passed along
      const safeRest = { ...rest };
      consumeProps.forEach(p => {
        Reflect.deleteProperty(safeRest, p);
      });

      // handle elementRefs
      if (elementRef) {
        // if the tag is a string, make our ref
        // otherwise pass elementRef along
        if (typeof Tag === 'string') {
          safeRest.ref = elementRef;
        } else {
          safeRest.elementRef = elementRef;
        }
      }

      // generate the final classnames for the component
      const safeClassNames = classNamesFunc(
        className,
        parseThemeOptions(theme),
        typeof classNames === 'function' ? classNames(rest) : classNames
      );

      // handle wrapping components
      if ((wrap || defaultWrap) && rest.children) {
        const child = React.Children.only(rest.children);
        return React.cloneElement(child, {
          ...child.props,
          ...safeRest,
          ...{ className: safeClassNames }
        });
      }

      // default return
      return <Tag className={safeClassNames} {...safeRest} />;
    }
  }

  Reflect.defineProperty(SimpleTag, 'name', {
    value: name,
    writable: false
  });

  return SimpleTag;
};
