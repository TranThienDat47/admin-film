import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useRef } from 'react';
import RipleAnimation from '../RipleAnimation';

const cx = classNames.bind(styles);

const Button = forwardRef(
   (
      {
         to,
         href,
         className,
         leftIcon,
         color,
         borderColor,
         borderRadius,
         fontSize = '1.6',
         rightIcon,
         transparent = false,
         normal = false,
         grey = false,
         primary = false,
         outline = false,
         disable = false,
         rounded = false,
         text = false,
         onlyText = false,
         hover = false,
         small = false,
         medium = false,
         large = false,
         children,
         onClick,
         backgroundColor,
         ripleAnimation = false,
         ripleAnimationLight = false,
         ...passProp
      },
      ref,
   ) => {
      const animationRef = useRef();
      const itemRef = useRef();
      let Comp = 'button';
      let props = {
         onClick,
         ...passProp,
      };
      if (disable) {
         Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') delete props[key];
         });
      }

      if (to) {
         props.to = to;
         Comp = Link;
      } else if (href) {
         props.href = href;
         Comp = 'a';
      }

      let start = false,
         time0,
         time1,
         time2;

      const handleAnimation = (e) => {
         if (start && animationRef.current) {
            animationRef.current.style.transition = 'all 0.3s cubic-bezier(0.75, 1, 0.25, 0)';
            animationRef.current.style.border = '1px solid rgba(22, 24, 35, 0.4)';

            time0 = setTimeout(() => {
               if (animationRef.current) {
                  animationRef.current.style.border = '1px solid rgba(22, 24, 35, 0.3)';
                  animationRef.current.style.backgroundColor = 'transparent';
               }
               clearTimeout(time0);
            }, 40);

            time1 = setTimeout(() => {
               if (animationRef.current) {
                  animationRef.current.style.border = '1px solid rgba(22, 24, 35, 0.1)';
               }
               clearTimeout(time1);
            }, 80);

            time2 = setTimeout(() => {
               if (animationRef.current)
                  animationRef.current.style.border = '1px solid transparent';
               clearTimeout(time2);
            }, 120);

            start = false;
         }
      };

      useEffect(() => {
         window.addEventListener('mouseup', handleAnimation);

         itemRef.current.addEventListener('mousedown', (e) => {
            if (e.which === 1) {
               if (animationRef.current) {
                  animationRef.current.style.backgroundColor = 'rgba(22, 24, 35, 0.1)';
                  animationRef.current.style.transition = '0s';
               }
               start = true;
            }
         });

         return () => {
            window.removeEventListener('mouseup', handleAnimation);
         };
      }, []);

      const classes = cx('wrapper', {
         [className]: className,
         leftIcon,
         rightIcon,
         fontSize,
         color,
         borderColor,
         borderRadius,
         primary,
         grey,
         outline,
         text,
         onlyText,
         small,
         medium,
         large,
         normal,
         disable,
         rounded,
         transparent,
         hover,
         ripleAnimation,
         ripleAnimationLight,
      });

      return (
         <div
            ref={ref}
            className={classes}
            {...props}
            style={{
               backgroundColor: backgroundColor,
               fontSize: `${fontSize}rem`,
               color: color,
               borderColor: borderColor,
               borderRadius: borderRadius,
            }}
         >
            <Comp ref={itemRef} className={cx('inner')}>
               {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
               <div className={cx('title')}>{children}</div>
               {rightIcon && <span className={cx('icon', 'right')}>{rightIcon}</span>}
               {!transparent || <div ref={animationRef} className={cx('animation')}></div>}
            </Comp>
            {ripleAnimation && (
               <RipleAnimation
                  light={ripleAnimationLight}
                  className={cx('ripple-amination')}
               ></RipleAnimation>
            )}
         </div>
      );
   },
);

Button.propTypes = {
   to: PropTypes.string,
   href: PropTypes.string,
   className: PropTypes.string,
   fontSize: PropTypes.string,
   color: PropTypes.string,
   borderColor: PropTypes.string,
   borderRadius: PropTypes.string,
   leftIcon: PropTypes.node,
   rightIcon: PropTypes.node,
   primary: PropTypes.bool,
   grey: PropTypes.bool,
   outline: PropTypes.bool,
   disable: PropTypes.bool,
   rounded: PropTypes.bool,
   hover: PropTypes.bool,
   transparent: PropTypes.bool,
   text: PropTypes.bool,
   onlyText: PropTypes.bool,
   small: PropTypes.bool,
   medium: PropTypes.bool,
   large: PropTypes.bool,
   normal: PropTypes.bool,
   ripleAnimation: PropTypes.bool,
   ripleAnimationLight: PropTypes.bool,
   children: PropTypes.node.isRequired,
   onClick: PropTypes.func,
};

export default Button;
