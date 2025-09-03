import { 
  Card as MuiCard, 
  CardMedia, 
  CardContent, 
  Box, 
  CardActionArea,
} from '@mui/material';
import Typography from './Typography';
import Chip from './Chip';
import TitleWithTooltip from './TitleWithToolTip';

const Card = ({
  title,
  image,
  imageAlt,
  tags = [],
  subtitle,
  description,
  maxItemsToShow = 3,
  onClick,
  elevation = 3,
  sx = {}
}) => {
  return (
    <MuiCard
      sx={{
        width: 250,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: elevation,
        borderRadius: '12px',
        overflow: 'hidden',
        ...sx
      }}
    >
      <CardActionArea 
        onClick={onClick}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          alignItems: 'stretch'
        }}
      >
        {image && (
          <CardMedia
            component="img"
            image={image}
            alt={imageAlt || title}
            sx={{
              width: '100%',
              height: 140,
              objectFit: 'cover'
            }}
          />
        )}

        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 2
          }}
        >
          <Box>
            <Box sx={{ mb: 1 }}>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {title}
              </Typography>

              {tags?.length > 0 && (
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                  {tags.slice(0, 2).map((tag, i) => (
                    <Chip
                      key={i}
                      label={tag.label}
                      size="small"
                      color={tag.color}
                      variant={tag.variant}
                    />
                  ))}
                  {tags.length > 2 && (
                    <Chip label={`+${tags.length - 2}`} size="small" />
                  )}
                </Box>
              )}
            </Box>

            {subtitle && (
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 1, fontStyle: 'italic', fontSize: '0.8rem' }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>

          {Array.isArray(description) ? (
            <Box>
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ fontSize: '0.75rem' }}
              >
                Ingredients:
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 0.5,
                  mt: 0.5
                }}
              >
                {description.slice(0, maxItemsToShow).map((item, i) => (
                  <Chip
                    key={i}
                    label={item}
                    size="small"
                    variant="outlined"
                  />
                ))}
                {description.length > maxItemsToShow && (
                  <Chip
                    label={`+${description.length - maxItemsToShow}`}
                    size="small"
                  />
                )}
              </Box>
            </Box>
          ) : (

            <TitleWithTooltip 
              title={description || ''}
              variant="body2"
              sx={{
                lineHeight: 1.5,
                fontSize: '0.7rem',
                color: 'text.secondary',
                mt: 0.5,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}
            />
          )}
        </CardContent>
      </CardActionArea>
    </MuiCard>
  );
};

export default Card;
