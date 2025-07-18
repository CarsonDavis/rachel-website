#!/usr/bin/env python3
"""
LPI Website Scraper for Rachel Slank feature article
"""

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time
import os

def setup_driver():
    """Set up Chrome driver"""
    options = webdriver.ChromeOptions()
    # Use headless mode for this simpler site
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
    
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    return driver

def scrape_lpi_article(url):
    """Scrape LPI article about Rachel Slank"""
    driver = setup_driver()
    
    try:
        print(f"Navigating to: {url}")
        driver.get(url)
        
        # Wait for page to load
        time.sleep(3)
        
        print(f"Page title: {driver.title}")
        print(f"Current URL: {driver.current_url}")
        
        # Get page source and parse with BeautifulSoup
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        
        # Save raw HTML for debugging
        with open('sti_page_source.html', 'w', encoding='utf-8') as f:
            f.write(driver.page_source)
        print("Page source saved to sti_page_source.html")
        
        # Extract article content
        article_data = {}
        
        # Try to find title
        title_selectors = ['h1', '.title', '.page-title', 'h1.entry-title']
        for selector in title_selectors:
            try:
                title_elem = soup.select_one(selector)
                if title_elem and title_elem.get_text().strip():
                    article_data['title'] = title_elem.get_text().strip()
                    break
            except:
                continue
        
        # Try to find main content
        content_selectors = [
            '.content',
            '.article-content', 
            '.entry-content',
            '.post-content',
            'main',
            '[role="main"]'
        ]
        
        for selector in content_selectors:
            try:
                content_elem = soup.select_one(selector)
                if content_elem:
                    # Get all paragraphs within content
                    paragraphs = content_elem.find_all('p')
                    if paragraphs:
                        article_data['content'] = '\n\n'.join([p.get_text().strip() for p in paragraphs if p.get_text().strip()])
                        break
            except:
                continue
        
        # If no specific content found, get all paragraphs
        if 'content' not in article_data:
            all_paragraphs = soup.find_all('p')
            if all_paragraphs:
                article_data['content'] = '\n\n'.join([p.get_text().strip() for p in all_paragraphs if p.get_text().strip()])
        
        # Try to find images
        try:
            images = soup.find_all('img')
            article_data['images'] = []
            for img in images:
                src = img.get('src')
                alt = img.get('alt', '')
                if src:
                    article_data['images'].append({
                        'src': src,
                        'alt': alt
                    })
        except:
            pass
        
        # Get page metadata
        article_data['url'] = url
        article_data['scraped_at'] = time.strftime('%Y-%m-%d %H:%M:%S')
        
        return article_data
        
    except Exception as e:
        print(f"Error scraping article: {e}")
        return None
    
    finally:
        driver.quit()

def generate_markdown(article_data):
    """Generate markdown from article data"""
    if not article_data:
        return "# Article data not available\n\nUnable to scrape article data."
    
    markdown = f"# {article_data.get('title', 'Rachel Slank - LPI Feature Article')}\n\n"
    
    markdown += f"**Source:** {article_data.get('url', '')}\n\n"
    
    if 'content' in article_data:
        # Split content into sections if it's very long
        content = article_data['content']
        if len(content) > 1000:
            # Try to split by double newlines (paragraph breaks)
            paragraphs = content.split('\n\n')
            markdown += "## Article Content\n\n"
            for para in paragraphs:
                if para.strip():
                    markdown += f"{para.strip()}\n\n"
        else:
            markdown += f"## Content\n\n{content}\n\n"
    
    if 'images' in article_data and article_data['images']:
        markdown += "## Images\n\n"
        for img in article_data['images']:
            if img['alt']:
                markdown += f"![{img['alt']}]({img['src']})\n"
            else:
                markdown += f"![]({img['src']})\n"
        markdown += "\n"
    
    markdown += f"---\n*Scraped on {article_data.get('scraped_at', 'unknown date')}*\n"
    
    return markdown

def main():
    """Main function"""
    url = "https://sti.usra.edu/personnel/rachel-slank-phd/"
    
    print("Starting STI USRA profile scraper...")
    article_data = scrape_lpi_article(url)
    
    if article_data:
        print("Successfully scraped article data")
        
        # Generate markdown
        markdown_content = generate_markdown(article_data)
        
        # Save to file
        with open('rachel_slank_sti_profile.md', 'w', encoding='utf-8') as f:
            f.write(markdown_content)
        
        print("Profile saved to rachel_slank_sti_profile.md")
        print("\nPreview:")
        print(markdown_content[:800] + "..." if len(markdown_content) > 800 else markdown_content)
    else:
        print("Failed to scrape article data")

if __name__ == "__main__":
    main()