import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "store/api";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
  Grow,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
} from "@mui/material";

import PageHeader from "components/PageHeader/PageHeader";
import { FlexBetween } from "UI/FlexPs";

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
  idx,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Grow
      // sx={{ transitionDelay: `${100 * idx}` }}
      in={true}
      {...{ timeout: 1000 }}
      style={{ transitionDelay: `${50 * idx}ms` }}
    >
      <Card
        sx={{
          backgroundColor: theme.palette.background.alt,
          borderRadius: "0.55rem",
          height: "fit-content",
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 14 }}
            color={theme.palette.secondary[700]}
            gutterBottom
          >
            {category.toUpperCase()}
          </Typography>
          <Typography variant="h5" component="div" gutterBottom>
            {name}
          </Typography>
          <Typography
            sx={{ mb: "1.5rem" }}
            color={theme.palette.secondary[400]}
          >
            ${Number(price).toFixed(2)}
          </Typography>
          <Rating value={rating} readOnly />
        </CardContent>
        <CardActions>
          <Button
            variant="primary"
            size="small"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            See More
          </Button>
        </CardActions>
        <Collapse
          in={isExpanded}
          timeout="auto"
          unmountOnExit
          sx={{
            color: theme.palette.neutral[300],
          }}
        >
          <CardContent>
            <Typography>id: {_id}</Typography>
            <Typography>Supply Left: {supply}</Typography>
            <Typography>
              Yearly Sales This Year: {stat.yearlySalesTotal}
            </Typography>
            <Typography>
              Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grow>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [sortType, setSortType] = useState(null);
  const theme = useTheme();
  const { data, isLoading, isSuccess } = useGetProductsQuery();

  const handleChange = (event) => {
    setSortType(event.target.value);
  };
  const sortHandler = (event) => {
    const type = event.target.value;
    console.log(type);
    setSortType(type);
    if (!type) {
      setProducts(data);
      setSortType(null);
      return;
    }
    const sortedProducts = [...data].sort((a, b) => {
      if (a[type] < b[type]) {
        return 1;
      }
      if (a[type] > b[type]) {
        return -1;
      }
      return 0;
    });
    setProducts(sortedProducts);
  };

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const isNonMobile = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <Box className={"block lg:flex justify-between items-center"}>
        <PageHeader title={"PRODUCTS"} subtitle={"See your list of products"} />
        <FormControl sx={{ mt: 1, minWidth: 120 }}>
          <Select
            value={sortType}
            onChange={sortHandler}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={null}>None</MenuItem>
            <MenuItem value={"category"}>Category</MenuItem>
            <MenuItem value={"price"}>Price</MenuItem>
            <MenuItem value={"rating"}>Rating</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {data && isSuccess && (
        <>
          <Box
            mt="20px"
            className={`grid  lg:grid-cols-5 md:grid-cols-3  gap-4`}
          >
            {products.map((product, idx) => {
              return <Product key={product._id} {...product} idx={idx} />;
            })}
          </Box>
        </>
      )}
      {isLoading && (
        <Typography
          className="mt-6"
          variant="h5"
          color={theme.palette.secondary[300]}
        >
          Loading....
        </Typography>
      )}
    </Box>
  );
};

export default Products;
