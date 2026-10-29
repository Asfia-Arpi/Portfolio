/**
 * Foodpanda BI dashboard facts.
 * IMPORTANT: this is a PRACTICE project built on a public Kaggle dataset. The data is not verified
 * and is not real Foodpanda company data. Figures below are read from the dashboard screenshot.
 */
export const foodpandaKpis = [
  { label: "Total revenue", value: "14.34M" },
  { label: "Total orders", value: "6K" },
  { label: "Total customers", value: "6K" },
  { label: "Average rating", value: "3.01" },
  { label: "Avg order value", value: "2.39K" },
  { label: "Restaurants", value: "5" },
];

/** Revenue by restaurant, in millions (dashboard funnel chart). */
export const revenueByRestaurant = [
  { name: "Pizza Hut", value: 3.0 },
  { name: "Subway", value: 3.0 },
  { name: "KFC", value: 2.95 },
  { name: "Burger King", value: 2.75 },
  { name: "McDonald's", value: 2.64 },
];

export const foodpandaFacts = [
  "Payment method split is close to even: cash 33.98%, card 32.65%, wallet 33.37%.",
  "Pasta is the most-ordered dish (443 orders), followed by sandwich (426).",
  "Delivered orders by food category range from 393 (dessert) to 439 (Italian).",
  "Delivered orders by age group: teenager 718, senior 680, adult 662.",
  "Monthly revenue peaks around 0.6M and declines towards the end of the date range (Aug 2023 – Aug 2025).",
];

export interface DaxMeasure {
  name: string;
  purpose: string;
  code: string;
}

/** From your Foodpanda DAX guide. These are the measure blueprint for the project. */
export const daxMeasures: DaxMeasure[] = [
  {
    name: "Order Revenue",
    purpose: "Revenue per row is quantity × price. Order IDs are never summed.",
    code: "Order Revenue = 'Foodpanda'[quantity] * 'Foodpanda'[price]",
  },
  {
    name: "Total Orders",
    purpose: "Counts unique orders with DISTINCTCOUNT so repeated rows do not inflate the KPI.",
    code: "Total Orders = DISTINCTCOUNT('Foodpanda'[order_id])",
  },
  {
    name: "Average Order Value",
    purpose: "Total sales divided by orders, using DIVIDE to avoid divide-by-zero errors.",
    code: "Average Order Value = DIVIDE([Total Sales], [Total Orders], 0)",
  },
  {
    name: "Delivery Success Rate",
    purpose: "Share of orders with status Delivered.",
    code: "Delivery Success Rate = DIVIDE([Delivered Orders], [Total Orders], 0)",
  },
  {
    name: "Cancellation Rate",
    purpose: "Share of orders with status Cancelled.",
    code: "Cancellation Rate = DIVIDE([Cancelled Orders], [Total Orders], 0)",
  },
  {
    name: "Churn Rate",
    purpose: "Churned customers divided by all customers.",
    code: "Churn Rate = DIVIDE([Churned Customers], [Total Customers], 0)",
  },
  {
    name: "Sales MoM Growth",
    purpose: "Month-over-month sales change using a Date Table and DATEADD.",
    code: "Sales MoM Growth =\nVAR CurrentSales = [Total Sales]\nVAR PreviousSales = [Previous Month Sales]\nRETURN DIVIDE(CurrentSales - PreviousSales, PreviousSales, 0)",
  },
];

export const businessKpis = [
  "Sales and order volume: Total Sales, Total Orders, Average Order Value",
  "Customer health: Total Customers, Churn Rate, Orders per Customer, loyalty points",
  "Service quality: Average Rating, Five Star Rate, Delivery Success Rate, Cancellation Rate",
];
