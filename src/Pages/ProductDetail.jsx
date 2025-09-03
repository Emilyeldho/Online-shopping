import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Box,
  CircularProgress,
  Stack,
  Button,
  Rating,
  Paper,
  Divider,
  Card,
  CardContent,
  Grid,
  Badge,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CustomChip from "../Components/Chip";
import Typography from "../Components/Typography";
import { useCart } from "../Context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const cartItem = cart.find((item) => item.id === Number(id));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);

        if (cartItem) {
          setQuantity(cartItem.quantity);
        }
      } catch (error) {
        console.error("Failed to load product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, cartItem]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (!product) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" color="error">
          Product not found 😢
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/")}>
          Back to Products
        </Button>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  const disableAddButton = cartItem && cartItem.quantity === quantity;

  return (
    <Container sx={{ py: 5 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button
          variant="outlined"
          sx={{
            mb: 3,
            borderRadius: 2,
            textTransform: "none",
            fontSize: "0.95rem",
          }}
          onClick={() => navigate(-1)}
        >
          ⬅ Back
        </Button>

        <Badge
          badgeContent={cart.length}
          color="secondary"
          onClick={() => navigate("/cart")}
          sx={{ cursor: "pointer" }}
        >
          <ShoppingCartIcon fontSize="large" />
        </Badge>
      </Stack>

      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          border: "1px solid #e0e0e0",
          mb: 5,
        }}
      >
        <Box sx={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          <Box
            component="img"
            src={product.thumbnail}
            alt={product.title}
            sx={{
              width: 380,
              height: 380,
              borderRadius: 3,
              objectFit: "cover",
              boxShadow: 3,
            }}
          />

          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", mb: 1, fontSize: "2rem" }}
            >
              {product.title}
            </Typography>

            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 2, fontSize: "1.1rem" }}
            >
              {product.brand} • {product.category}
            </Typography>

            {/* Description */}
            <Paper
              elevation={0}
              sx={{
                maxHeight: 120,
                overflowY: "auto",
                p: 2,
                mb: 2,
                border: "1px solid #eee",
                borderRadius: 2,
                bgcolor: "#fafafa",
              }}
            >
              <Typography
                variant="body1"
                sx={{ lineHeight: 1.8, fontSize: "1rem" }}
              >
                {product.description}
              </Typography>
            </Paper>

            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
              <Rating
                name="read-only"
                value={product.rating}
                precision={0.5}
                readOnly
                size="large"
              />
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: "1rem" }}
              >
                ({product.rating})
              </Typography>
            </Stack>

            <Divider sx={{ my: 2 }} />
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <CustomChip
                label={`$${product.price}`}
                color="primary"
                sx={{ fontSize: "1rem", px: 2, py: 1 }}
              />
              <CustomChip
                label={`Stock: ${product.stock}`}
                color="default"
                sx={{ fontSize: "1rem", px: 2, py: 1 }}
              />
            </Stack>

            <FormControl sx={{ mb: 3, minWidth: 120 }}>
              <InputLabel id="qty-label">Quantity</InputLabel>
              <Select
                labelId="qty-label"
                value={quantity}
                label="Quantity"
                onChange={(e) => setQuantity(e.target.value)}
              >
                {[...Array(10).keys()].map((q) => (
                  <MenuItem key={q + 1} value={q + 1}>
                    {q + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Total: ${totalPrice}
            </Typography>

            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCartIcon />}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1.1rem",
                px: 5,
                py: 1.5,
              }}
              onClick={handleAddToCart}
              disabled={disableAddButton}
            >
              {cartItem
                ? disableAddButton
                  ? "Added to Cart"
                  : "Update Cart"
                : "Add to Cart"}
            </Button>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 5 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
          Product Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><b>SKU:</b> {product.sku}</Typography>
            <Typography variant="body1"><b>Warranty:</b> {product.warrantyInformation}</Typography>
            <Typography variant="body1"><b>Shipping:</b> {product.shippingInformation}</Typography>
            <Typography variant="body1"><b>Return Policy:</b> {product.returnPolicy}</Typography>
            <Typography variant="body1"><b>Availability:</b> {product.availabilityStatus}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><b>Weight:</b> {product.weight} g</Typography>
            <Typography variant="body1">
              <b>Dimensions:</b> {product.dimensions?.width} × {product.dimensions?.height} × {product.dimensions?.depth} cm
            </Typography>
            <Typography variant="body1"><b>Barcode:</b> {product.meta?.barcode}</Typography>
            <Typography variant="body1"><b>Created At:</b> {product.meta?.createdAt ? new Date(product.meta.createdAt).toLocaleDateString() : "N/A"}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
        Customer Reviews
      </Typography>

      {product.reviews && product.reviews.length > 0 ? (
        <Stack spacing={2}>
          {product.reviews.map((review, idx) => (
            <Card
              key={idx}
              sx={{ borderRadius: 2, border: "1px solid #e0e0e0" }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <Typography variant="body2">
                    {review.reviewerName} •{" "}
                    {new Date(review.date).toLocaleDateString()}
                  </Typography>

                  <Rating value={review.rating} readOnly size="small" />
                </Stack>
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ fontWeight: "bold" }}
                >
                  {review.comment}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No reviews yet. Be the first to review this product.
        </Typography>
      )}
    </Container>
  );
};

export default ProductDetail;
