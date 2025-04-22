import requests
from bs4 import BeautifulSoup
import pandas as pd

# URL of the Food Basics Apples & Pears page
url = "https://www.foodbasics.ca/aisles/fruits-vegetables/fruits/apples-pears"

# Send a request to fetch the webpage
headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
}
response = requests.get(url, headers=headers)

# Check if the request was successful
if response.status_code != 200:
    print(f"Failed to retrieve page: Status code {response.status_code}")
    exit()

# Parse the HTML content
soup = BeautifulSoup(response.text, "html.parser")

# Initialize lists to store product data
products = []
prices = []
units = []

# Find all product containers (based on inspecting the website's HTML)
product_containers = soup.find_all("div", class_="product-tile__content")

for container in product_containers:
    # Extract product name
    name_tag = container.find("h3", class_="product-tile__title")
    product_name = name_tag.text.strip() if name_tag else "N/A"

    # Extract price
    price_tag = container.find("span", class_="price")
    product_price = price_tag.text.strip() if price_tag else "N/A"

    # Extract unit (if available)
    unit_tag = container.find("span", class_="unit")
    product_unit = unit_tag.text.strip() if unit_tag else "N/A"

    # Append to lists
    products.append(product_name)
    prices.append(product_price)
    units.append(product_unit)

# Create a DataFrame
data = {
    "Product Name": products,
    "Price": prices,
    "Unit": units
}
df = pd.DataFrame(data)

# Save to Excel
output_file = "foodbasics_apples_pears.xlsx"
df.to_excel(output_file, index=False)
print(f"Data saved to {output_file}")