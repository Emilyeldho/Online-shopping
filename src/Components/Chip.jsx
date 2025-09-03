import { Chip as MuiChip } from '@mui/material';
import { colours } from '../constant';
import { getColorForLabel } from '../utils';

const Chip = ({
  label,
  size = 'small',
  color = 'default',
  variant = 'filled',
  icon,
  onClick,
  onDelete,
  sx = {},
  ...props
}) => {
  const chipColor = color === 'default' ? undefined : color;
  const backgroundColor = color === 'default' ? getColorForLabel(label, colours) : undefined;
  
  return (
    <MuiChip
      label={label}
      size={size}
      color={chipColor}
      variant={variant}
      icon={icon}
      onClick={onClick}
      onDelete={onDelete}
      sx={{
        borderRadius: '4px',
        fontWeight: 500,
        ...(backgroundColor && {
          backgroundColor: backgroundColor,
          color: '#fff',
        }),
        ...sx
      }}
      {...props}
    />
  );
};

export default Chip;