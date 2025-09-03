import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Container,
    TextField,
    Grid,
    Box,
    CircularProgress,
    Alert,
    PaginationItem,
    Stack
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useNavigate } from "react-router-dom";

import useFetch from '../Hooks/useFetch';
import useDebounce from '../Hooks/useDebounce';
import { delay } from '../constant';
import Card from '../Components/Card';
import Typography from '../Components/Typography';
import CustomChip from '../Components/Chip';
import CustomPagination from '../Components/Pagination';
import TitleWithTooltip from '../Components/TitleWithToolTip';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, delay);
    const [page, setPage] = useState(1);
    const [viewMode, setViewMode] = useState("grid");
    const limit = 20;
    const loaderRef = useRef(null);
    const navigate = useNavigate();

    const { data, loading, error } = useFetch(
        `https://dummyjson.com/products/search?q=${debouncedSearchTerm}&limit=${limit}&skip=${
            (page - 1) * limit
        }`
    );

    useEffect(() => {
        if (data && data.products) {
            if (viewMode === "list" && page > 1) {
                setProducts((prev) => [...prev, ...data.products]);
            } else {
                setProducts(data.products);
            }
        } else {
            setProducts([]);
        }
    }, [data, viewMode]);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearchTerm, viewMode]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        setPage(1);
    };

    const handlePageChange = (_, value) => {
        setPage(value);
    };

    const handleObserver = useCallback(
        (entries) => {
            const target = entries[0];
            if (target.isIntersecting && !loading && data && products.length < data.total) {
                setPage((prev) => prev + 1);
            }
        },
        [loading, data, products.length]
    );

    useEffect(() => {
        if (viewMode !== "list") return;
        const option = {
            root: null,
            rootMargin: "200px",
            threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [handleObserver, viewMode]);

    const cardClick = (id) => () => {
        navigate(`/products/${id}`);
    };

    return (
        <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
            <Box sx={{ mb: 5, position: "relative" }}>
                <Box sx={{ textAlign: "center" }}>
                    <Typography
                        variant="h3"
                        component="h1"
                        sx={{
                            fontWeight: "bold",
                            mb: 2,
                            fontSize: { xs: "2rem", md: "3rem" },
                            background: "linear-gradient(90deg, #FE6B8B, #FF8E53)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Explore Products
                    </Typography>

                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="🔍 Search products..."
                        value={searchTerm}
                        onChange={handleChange}
                        sx={{
                            maxWidth: 600,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "50px",
                                boxShadow: 2,
                                transition: "0.3s",
                                "&:hover": {
                                    boxShadow: 5,
                                },
                            },
                            "& input": {
                                py: 1.5,
                            },
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <TitleWithTooltip
                        title="Grid View"
                        onClick={() => setViewMode("grid")}
                        sx={{ mr: 1, mt: 0.5, cursor: "pointer" }}
                    >
                        <ViewModuleIcon
                            color={viewMode === "grid" ? "primary" : "action"}
                            sx={{
                                ...(viewMode === "grid" && {
                                    border: "2px solid",
                                    borderRadius: "6px",
                                    padding: "4px",
                                    fontSize: "2rem"
                                }),
                            }}
                        />
                    </TitleWithTooltip>

                    <TitleWithTooltip
                        title="List View"
                        onClick={() => setViewMode("list")}
                        sx={{ mr: 1, mt: 0.5, cursor: "pointer" }}
                    >
                        <ViewListIcon
                            color={viewMode === "list" ? "primary" : "action"}
                            sx={{
                                ...(viewMode === "list" && {
                                    border: "2px solid",
                                    borderRadius: "6px",
                                    padding: "4px",
                                    fontSize: "2rem"
                                }),
                            }}
                        />
                    </TitleWithTooltip>
                </Box>
            </Box>

            {loading && page === 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
                    <CircularProgress size={60} thickness={4} />
                </Box>
            )}

            {error && (
                <Alert severity="error" sx={{ mb: 4 }}>
                    <CustomChip label="Error" color="error" sx={{ mr: 1 }} />
                    <Typography color="error">
                        {error.message || 'Failed to fetch products'}
                    </Typography>
                </Alert>
            )}

            {!loading && products.length === 0 && (
                <Box
                    sx={{
                        textAlign: 'center',
                        p: 5,
                        borderRadius: 3,
                        backgroundColor: 'background.paper',
                        boxShadow: 2,
                    }}
                >
                    <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
                        No products found 😢
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Try searching with a different keyword.
                    </Typography>
                </Box>
            )}

            {viewMode === "grid" ? (
                <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ mt: 2 }}>
                    {products.map((item) => (
                        <Grid item key={item.id} xs={12} sm={6} md={4} lg={3} xl={2.4}>
                            <Card
                                title={item.title}
                                image={item.thumbnail}
                                subtitle={`${item.brand} • ${item.category}`}
                                description={item.description}
                                onClick={cardClick(item.id)}
                                tags={[
                                    { label: `$${item.price}`, color: 'primary' },
                                    { label: `⭐ ${item.rating}`, color: 'secondary' },
                                ]}
                                elevation={2}
                                sx={{
                                    height: '100%',
                                    transition: '0.3s',
                                    cursor: "pointer",
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: 6,
                                    },
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Stack spacing={3} sx={{ mt: 2 }}>
                    {products.map((item) => (
                        <Box
                            key={item.id}
                            onClick={cardClick(item.id)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                p: 2,
                                borderRadius: 2,
                                boxShadow: 2,
                                cursor: "pointer",
                                transition: '0.3s',
                                '&:hover': {
                                    transform: 'translateY(-3px)',
                                    boxShadow: 4,
                                },
                            }}
                        >
                            <Box
                                component="img"
                                src={item.thumbnail}
                                alt={item.title}
                                sx={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: 2,
                                    objectFit: 'cover',
                                    mr: 3,
                                }}
                            />
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {item?.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    {item.brand} • {item.category}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.description}
                                </Typography>
                            </Box>
                            <Stack spacing={1} direction="row" sx={{ ml: 2 }}>
                                <CustomChip label={`$${item.price}`} color="primary" />
                                <CustomChip label={`⭐ ${item.rating}`} color="secondary" />
                            </Stack>
                        </Box>
                    ))}

                    {loading && page > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                            <CircularProgress size={40} thickness={3} />
                        </Box>
                    )}
                    <div ref={loaderRef} />
                </Stack>
            )}

            {viewMode === "grid" && data && data.total > limit && (
                <Stack spacing={2} sx={{ mt: 5, alignItems: 'center' }}>
                    <CustomPagination
                        count={Math.ceil(data.total / limit)}
                        page={page}
                        onChange={handlePageChange}
                        renderItem={(item) => (
                            <PaginationItem
                                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                {...item}
                            />
                        )}
                    />
                </Stack>
            )}
        </Container>
    );
};

export default ProductList;
