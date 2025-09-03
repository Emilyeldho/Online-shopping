import {
  Container,
  Typography,
  Stack,
  Button,
  Divider,
  Box,
  Card,
  CardMedia,
} from "@mui/material";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h5">🛒 Your cart is empty</Typography>
        <Button
          variant="outlined"
          sx={{ mt: 3, borderRadius: 2, textTransform: "none" }}
          onClick={() => navigate(-1)}
        >
          ⬅ Back
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="outlined"
          sx={{ borderRadius: 2, textTransform: "none" }}
          onClick={() => navigate(-1)}
        >
          ⬅ Back
        </Button>
      </Box>

      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}
      >
        Shopping Cart
      </Typography>

      <Stack spacing={2}>
        {cart.map((item) => (
          <Stack
            key={item.id}
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{
              p: 2,
              border: "1px solid #ddd",
              borderRadius: 2,
              backgroundColor: "#fafafa",
            }}
          >
            <Card sx={{ width: 60, height: 60, flexShrink: 0 }}>
              <CardMedia
                component="img"
                image={item.images?.[0] || item.thumbnail}
                alt={item.title}
                sx={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
            </Card>

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Qty: {item.quantity}
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ minWidth: 80, textAlign: "right" }}>
              ${(item.price * item.quantity).toFixed(2)}
            </Typography>

            <Button
              color="error"
              onClick={() => removeFromCart(item.id)}
              size="small"
            >
              Remove
            </Button>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "right" }}>
        Grand Total: ${totalAmount}
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={clearCart}>
          Clear Cart
        </Button>
        <Button variant="contained" color="success">
          Checkout
        </Button>
      </Stack>
    </Container>
  );
};

export default CartPage;
