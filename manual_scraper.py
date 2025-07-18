#!/usr/bin/env python3
"""
Alternative LinkedIn scraper that uses your existing browser session
"""

import requests
from bs4 import BeautifulSoup
import json

def scrape_with_cookies():
    """
    To use this method:
    1. In your existing Chrome browser, go to LinkedIn and login
    2. Go to Rachel's profile: https://www.linkedin.com/in/rachel-slank-6230249b/
    3. Right-click -> Inspect -> Network tab
    4. Refresh the page
    5. Find the main page request in Network tab
    6. Right-click on it -> Copy -> Copy as cURL
    7. Use that cURL command or extract the cookies from it
    """
    
    # You would need to extract cookies from your browser and put them here
    cookies = {
        # Add your LinkedIn cookies here
        # 'li_at': 'your_li_at_cookie_value',
        # 'JSESSIONID': 'your_jsessionid_value',
        # etc.
    }
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
    }
    
    url = "https://www.linkedin.com/in/rachel-slank-6230249b/"
    
    try:
        response = requests.get(url, cookies=cookies, headers=headers)
        if response.status_code == 200:
            return response.text
        else:
            print(f"Failed to fetch page. Status code: {response.status_code}")
            return None
    except Exception as e:
        print(f"Error fetching page: {e}")
        return None

def simple_browser_instruction():
    """
    Simple instructions for manual extraction
    """
    print("MANUAL EXTRACTION METHOD:")
    print("1. Open your Chrome browser")
    print("2. Go to: https://www.linkedin.com/in/rachel-slank-6230249b/")
    print("3. Right-click on the page -> Save As -> save as 'rachel_profile.html'")
    print("4. Move the saved file to this directory")
    print("5. Run this script again to parse the saved HTML")
    
    # Check if saved file exists
    import os
    if os.path.exists('rachel_profile.html'):
        print("\nFound rachel_profile.html! Parsing now...")
        with open('rachel_profile.html', 'r', encoding='utf-8') as f:
            return f.read()
    else:
        print("\nrachel_profile.html not found. Please save the page first.")
        return None

def parse_linkedin_html(html_content):
    """Parse LinkedIn profile HTML"""
    if not html_content:
        return None
        
    soup = BeautifulSoup(html_content, 'html.parser')
    profile_data = {}
    
    # Try various selectors for name
    name_selectors = [
        'h1.text-heading-xlarge',
        'h1[class*="heading"]',
        '.pv-text-details__left-panel h1',
        '.ph5 h1'
    ]
    
    for selector in name_selectors:
        try:
            name_elem = soup.select_one(selector)
            if name_elem:
                profile_data['name'] = name_elem.get_text().strip()
                break
        except:
            continue
    
    # Try various selectors for headline
    headline_selectors = [
        '.text-body-medium.break-words',
        '.pv-text-details__left-panel .text-body-medium',
        '[data-generated-suggestion-target]'
    ]
    
    for selector in headline_selectors:
        try:
            headline_elem = soup.select_one(selector)
            if headline_elem:
                profile_data['headline'] = headline_elem.get_text().strip()
                break
        except:
            continue
    
    # Get all text content for analysis
    all_text = soup.get_text()
    
    return {
        'profile_data': profile_data,
        'full_text': all_text[:2000] + "..." if len(all_text) > 2000 else all_text,
        'html_length': len(html_content)
    }

def main():
    print("LinkedIn Profile Extractor")
    print("=" * 40)
    
    # Try the simple browser method first
    html_content = simple_browser_instruction()
    
    if html_content:
        result = parse_linkedin_html(html_content)
        if result:
            print(f"\nProfile Data Found:")
            print(json.dumps(result['profile_data'], indent=2))
            print(f"\nHTML length: {result['html_length']} characters")
            print(f"\nFirst 500 characters of text:")
            print(result['full_text'][:500])
            
            # Save results
            with open('rachel_profile_data.json', 'w') as f:
                json.dump(result, f, indent=2)
            print("\nData saved to rachel_profile_data.json")
        else:
            print("Could not parse profile data")
    
if __name__ == "__main__":
    main()