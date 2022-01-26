/* eslint-disable react/jsx-no-target-blank */
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Button = ({
  className,
  isPrimary,
  isLarge,
  isSmall,
  isBlock,
  hasShadow,
  onClick,
  type,
  isExternal,
  children,
  href,
  inlineStyle,
  target,
  isDisabled,
  isLoading,
}) => {
  const styles = [className];
  if (isPrimary) styles.push("btn-primary");
  if (isLarge) styles.push("btn-lg");
  if (isSmall) styles.push("btn-sm");
  if (isBlock) styles.push("btn-block");
  if (hasShadow) styles.push("btn-shadow");

  const onClickHandler = () => {
    if (onClick) onClick();
  };

  if (isDisabled || isLoading) {
		if (isDisabled) styles.push("disabled");
    return (
      <span className={styles.join(" ")} style={inlineStyle}>
        {isLoading ? (
					<>
						<span className="spinner-border spinner-border-sm mx-5"></span>
						<span className="sr-only">Loading...</span>
					</>
				) : children}
      </span>
    );
  }

  // Conditioning links behavior either external or internal
  if (type === "link") {
    if (isExternal) {
      return (
        <a
          href={href}
          className={styles.join(" ")}
          style={inlineStyle}
          target={target === "_blank" ? "_blank" : undefined}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    } else {
      return (
        <Link
          to={href}
          className={styles.join(" ")}
          style={inlineStyle}
          onClick={onClickHandler}
        >
          {children}
        </Link>
      );
    }
  }

  return (
    <button
      className={styles.join(" ")}
      style={inlineStyle}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};

// eslint-disable-next-line react/no-typos
Button.propTypes = {
  type: PropTypes.oneOf(["button", "link"]),
  onClick: PropTypes.func,
  target: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isSmall: PropTypes.bool,
  isLarge: PropTypes.bool,
  isBlock: PropTypes.bool,
  hasShadow: PropTypes.bool,
  isExternal: PropTypes.bool,
};

export default Button;
