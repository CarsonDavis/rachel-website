#!/usr/bin/env python3
"""
Google Scholar Profile Scraper for Rachel Slank
"""

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time
import os
import json

def setup_driver():
    """Set up Chrome driver"""
    options = webdriver.ChromeOptions()
    # Use headless mode
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
    
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    return driver

def scrape_scholar_profile(url):
    """Scrape Google Scholar profile"""
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
        with open('scholar_page_source.html', 'w', encoding='utf-8') as f:
            f.write(driver.page_source)
        print("Page source saved to scholar_page_source.html")
        
        # Extract profile data
        scholar_data = {}
        
        # Get name
        try:
            name_elem = soup.find('div', {'id': 'gsc_prf_in'})
            if name_elem:
                scholar_data['name'] = name_elem.get_text().strip()
        except:
            pass
        
        # Get affiliation
        try:
            affiliation_elem = soup.find('div', class_='gsc_prf_il')
            if affiliation_elem:
                scholar_data['affiliation'] = affiliation_elem.get_text().strip()
        except:
            pass
        
        # Get email domain
        try:
            email_elem = soup.find('div', {'id': 'gsc_prf_ivh'})
            if email_elem:
                scholar_data['email_domain'] = email_elem.get_text().strip()
        except:
            pass
        
        # Get research interests
        try:
            interests_section = soup.find('div', {'id': 'gsc_prf_int'})
            if interests_section:
                interests = []
                interest_links = interests_section.find_all('a', class_='gsc_prf_inta')
                for link in interest_links:
                    interests.append(link.get_text().strip())
                scholar_data['interests'] = interests
        except:
            pass
        
        # Get citation statistics
        try:
            stats_table = soup.find('table', {'id': 'gsc_rsb_st'})
            if stats_table:
                rows = stats_table.find_all('tr')
                stats = {}
                for row in rows[1:]:  # Skip header
                    cells = row.find_all('td')
                    if len(cells) >= 3:
                        metric = cells[0].get_text().strip()
                        all_time = cells[1].get_text().strip()
                        since_2019 = cells[2].get_text().strip()
                        stats[metric] = {
                            'all_time': all_time,
                            'since_2019': since_2019
                        }
                scholar_data['citation_stats'] = stats
        except:
            pass
        
        # Get publications
        try:
            publications = []
            pub_table = soup.find('table', {'id': 'gsc_a_t'})
            if pub_table:
                pub_rows = pub_table.find_all('tr', class_='gsc_a_tr')
                for row in pub_rows:
                    pub_data = {}
                    
                    # Title and authors
                    title_cell = row.find('td', class_='gsc_a_t')
                    if title_cell:
                        title_link = title_cell.find('a', class_='gsc_a_at')
                        if title_link:
                            pub_data['title'] = title_link.get_text().strip()
                        
                        authors_div = title_cell.find('div', class_='gs_gray')
                        if authors_div:
                            pub_data['authors'] = authors_div.get_text().strip()
                        
                        # Journal/venue
                        venue_divs = title_cell.find_all('div', class_='gs_gray')
                        if len(venue_divs) > 1:
                            pub_data['venue'] = venue_divs[1].get_text().strip()
                    
                    # Citations
                    citation_cell = row.find('td', class_='gsc_a_c')
                    if citation_cell:
                        citation_link = citation_cell.find('a', class_='gsc_a_ac')
                        if citation_link:
                            citations = citation_link.get_text().strip()
                            pub_data['citations'] = citations if citations else '0'
                        else:
                            pub_data['citations'] = '0'
                    
                    # Year
                    year_cell = row.find('td', class_='gsc_a_y')
                    if year_cell:
                        year_span = year_cell.find('span', class_='gsc_a_h')
                        if year_span:
                            pub_data['year'] = year_span.get_text().strip()
                    
                    if pub_data:
                        publications.append(pub_data)
                
                scholar_data['publications'] = publications
        except Exception as e:
            print(f"Error extracting publications: {e}")
        
        # Get citation graph data if available
        try:
            graph_data = []
            graph_bars = soup.find_all('a', class_='gsc_g_a')
            for bar in graph_bars:
                year = bar.get('href', '').split('=')[-1] if bar.get('href') else ''
                height = bar.find('span', class_='gsc_g_al')
                citations = height.get_text().strip() if height else '0'
                if year:
                    graph_data.append({
                        'year': year,
                        'citations': citations
                    })
            if graph_data:
                scholar_data['citation_graph'] = graph_data
        except:
            pass
        
        scholar_data['url'] = url
        scholar_data['scraped_at'] = time.strftime('%Y-%m-%d %H:%M:%S')
        
        return scholar_data
        
    except Exception as e:
        print(f"Error scraping scholar profile: {e}")
        return None
    
    finally:
        driver.quit()

def generate_markdown(scholar_data):
    """Generate markdown from scholar data"""
    if not scholar_data:
        return "# Scholar data not available\n\nUnable to scrape Google Scholar profile."
    
    markdown = f"# {scholar_data.get('name', 'Rachel Slank')} - Google Scholar Profile\n\n"
    
    markdown += f"**Source:** [Google Scholar]({scholar_data.get('url', '')})\n\n"
    
    if 'affiliation' in scholar_data:
        markdown += f"**Affiliation:** {scholar_data['affiliation']}\n\n"
    
    if 'email_domain' in scholar_data:
        markdown += f"**Email Domain:** {scholar_data['email_domain']}\n\n"
    
    # Research interests
    if 'interests' in scholar_data and scholar_data['interests']:
        markdown += "## Research Interests\n\n"
        for interest in scholar_data['interests']:
            markdown += f"- {interest}\n"
        markdown += "\n"
    
    # Citation statistics
    if 'citation_stats' in scholar_data:
        markdown += "## Citation Statistics\n\n"
        markdown += "| Metric | All Time | Since 2019 |\n"
        markdown += "|--------|----------|------------|\n"
        for metric, values in scholar_data['citation_stats'].items():
            markdown += f"| {metric} | {values['all_time']} | {values['since_2019']} |\n"
        markdown += "\n"
    
    # Citation graph
    if 'citation_graph' in scholar_data and scholar_data['citation_graph']:
        markdown += "## Citation History\n\n"
        markdown += "| Year | Citations |\n"
        markdown += "|------|----------|\n"
        for entry in scholar_data['citation_graph']:
            markdown += f"| {entry['year']} | {entry['citations']} |\n"
        markdown += "\n"
    
    # Publications
    if 'publications' in scholar_data and scholar_data['publications']:
        markdown += "## Publications\n\n"
        for i, pub in enumerate(scholar_data['publications'], 1):
            markdown += f"### {i}. {pub.get('title', 'Untitled')}\n\n"
            
            if 'authors' in pub:
                markdown += f"**Authors:** {pub['authors']}\n\n"
            
            if 'venue' in pub:
                markdown += f"**Published in:** {pub['venue']}\n\n"
            
            if 'year' in pub:
                markdown += f"**Year:** {pub['year']}\n\n"
            
            if 'citations' in pub:
                citations = pub['citations'] if pub['citations'] != '0' else 'No citations yet'
                markdown += f"**Citations:** {citations}\n\n"
            
            markdown += "---\n\n"
    
    markdown += f"*Profile scraped on {scholar_data.get('scraped_at', 'unknown date')}*\n"
    
    return markdown

def main():
    """Main function"""
    url = "https://scholar.google.com/citations?user=isL-R9wAAAAJ&hl=en"
    
    print("Starting Google Scholar profile scraper...")
    scholar_data = scrape_scholar_profile(url)
    
    if scholar_data:
        print("Successfully scraped scholar data")
        
        # Save raw data
        with open('rachel_scholar_data.json', 'w', encoding='utf-8') as f:
            json.dump(scholar_data, f, indent=2)
        
        # Generate markdown
        markdown_content = generate_markdown(scholar_data)
        
        # Save to file
        with open('rachel_slank_scholar.md', 'w', encoding='utf-8') as f:
            f.write(markdown_content)
        
        print("Scholar profile saved to rachel_slank_scholar.md")
        print("Raw data saved to rachel_scholar_data.json")
        print("\nPreview:")
        print(markdown_content[:1000] + "..." if len(markdown_content) > 1000 else markdown_content)
    else:
        print("Failed to scrape scholar data")

if __name__ == "__main__":
    main()