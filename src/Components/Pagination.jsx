import { Pagination, PaginationItem, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function CustomPagination({ count, page, onChange }) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
  );
}