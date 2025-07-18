#!/usr/bin/env python3
"""
LinkedIn Profile Scraper for Rachel Slank
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time
import json
import os

def setup_driver():
    """Set up Chrome driver with separate profile"""
    options = webdriver.ChromeOptions()
    # Use a separate user data directory to avoid conflicts
    temp_profile_dir = os.path.expanduser('~/temp_chrome_profile')
    options.add_argument(f"--user-data-dir={temp_profile_dir}")
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--disable-blink-features=AutomationControlled')
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)
    
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
    return driver

def scrape_linkedin_profile(url):
    """Scrape LinkedIn profile information"""
    driver = setup_driver()
    
    try:
        print(f"Navigating to: {url}")
        driver.get(url)
        
        # Wait for page to load
        time.sleep(5)
        
        # Save page source for debugging
        with open('linkedin_page_source.html', 'w', encoding='utf-8') as f:
            f.write(driver.page_source)
        print("Page source saved to linkedin_page_source.html")
        
        # Get page source and parse with BeautifulSoup
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        
        # Extract profile information
        profile_data = {}
        
        print("Page title:", driver.title)
        print("Current URL:", driver.current_url)
        
        # Check if we need to login (check for various LinkedIn auth pages)
        if any(keyword in driver.current_url.lower() for keyword in ['authwall', 'login', 'signup']) or \
           any(keyword in driver.title.lower() for keyword in ['sign up', 'log in', 'join linkedin']):
            print("LinkedIn login required. Please login manually in the browser window.")
            print("After logging in, navigate to: https://www.linkedin.com/in/rachel-slank-6230249b/")
            input("Press Enter after you've logged in and are viewing the profile page...")
            
            # Refresh page source after manual login
            with open('linkedin_page_source_after_login.html', 'w', encoding='utf-8') as f:
                f.write(driver.page_source)
            print("Updated page source saved to linkedin_page_source_after_login.html")
            
        # Wait a bit more for the page to fully load
        time.sleep(3)
        
        # Name
        try:
            name_element = soup.find('h1', class_='text-heading-xlarge')
            if name_element:
                profile_data['name'] = name_element.get_text().strip()
        except:
            pass
        
        # Headline/Title
        try:
            headline_element = soup.find('div', class_='text-body-medium')
            if headline_element:
                profile_data['headline'] = headline_element.get_text().strip()
        except:
            pass
        
        # Location
        try:
            location_elements = soup.find_all('span', class_='text-body-small')
            for element in location_elements:
                text = element.get_text().strip()
                if ',' in text and len(text) < 50:  # Likely a location
                    profile_data['location'] = text
                    break
        except:
            pass
        
        # About section
        try:
            about_section = soup.find('section', {'data-section': 'summary'})
            if about_section:
                about_text = about_section.find('div', class_='full-width')
                if about_text:
                    profile_data['about'] = about_text.get_text().strip()
        except:
            pass
        
        # Experience section
        try:
            experience_section = soup.find('section', {'data-section': 'experience'})
            if experience_section:
                experiences = []
                exp_items = experience_section.find_all('div', class_='artdeco-card')
                for item in exp_items:
                    exp_data = {}
                    # Job title
                    title_elem = item.find('div', class_='display-flex')
                    if title_elem:
                        exp_data['title'] = title_elem.get_text().strip()
                    experiences.append(exp_data)
                profile_data['experience'] = experiences
        except:
            pass
        
        # Education section
        try:
            education_section = soup.find('section', {'data-section': 'education'})
            if education_section:
                education = []
                edu_items = education_section.find_all('div', class_='artdeco-card')
                for item in edu_items:
                    edu_data = {}
                    # School name
                    school_elem = item.find('div', class_='display-flex')
                    if school_elem:
                        edu_data['school'] = school_elem.get_text().strip()
                    education.append(edu_data)
                profile_data['education'] = education
        except:
            pass
        
        return profile_data
        
    except Exception as e:
        print(f"Error scraping profile: {e}")
        return None
    
    finally:
        driver.quit()

def generate_markdown(profile_data):
    """Generate markdown from profile data"""
    if not profile_data:
        return "# Profile data not available\n\nUnable to scrape LinkedIn profile data."
    
    markdown = f"# {profile_data.get('name', 'Rachel Slank')} - LinkedIn Profile\n\n"
    
    if 'headline' in profile_data:
        markdown += f"## Professional Summary\n{profile_data['headline']}\n\n"
    
    if 'location' in profile_data:
        markdown += f"**Location:** {profile_data['location']}\n\n"
    
    if 'about' in profile_data:
        markdown += f"## About\n{profile_data['about']}\n\n"
    
    if 'experience' in profile_data and profile_data['experience']:
        markdown += "## Professional Experience\n\n"
        for exp in profile_data['experience']:
            if 'title' in exp:
                markdown += f"### {exp['title']}\n"
                markdown += "- **Duration:** [To be filled]\n"
                markdown += "- **Company:** [To be filled]\n"
                markdown += "- **Description:** [To be filled]\n\n"
    
    if 'education' in profile_data and profile_data['education']:
        markdown += "## Education\n\n"
        for edu in profile_data['education']:
            if 'school' in edu:
                markdown += f"### {edu['school']}\n"
                markdown += "- **Duration:** [To be filled]\n"
                markdown += "- **Degree:** [To be filled]\n\n"
    
    markdown += f"\n## Contact Information\n"
    markdown += f"- **LinkedIn:** https://www.linkedin.com/in/rachel-slank-6230249b/\n\n"
    markdown += f"---\n*Profile scraped on {time.strftime('%Y-%m-%d %H:%M:%S')}*\n"
    
    return markdown

def main():
    """Main function"""
    url = "https://www.linkedin.com/in/rachel-slank-6230249b/"
    
    print("Starting LinkedIn profile scraper...")
    profile_data = scrape_linkedin_profile(url)
    
    if profile_data:
        print(f"Successfully scraped profile data: {json.dumps(profile_data, indent=2)}")
        
        # Generate markdown
        markdown_content = generate_markdown(profile_data)
        
        # Save to file
        with open('rachel_slank_profile.md', 'w', encoding='utf-8') as f:
            f.write(markdown_content)
        
        print("Profile saved to rachel_slank_profile.md")
        print("\nGenerated markdown preview:")
        print(markdown_content[:500] + "..." if len(markdown_content) > 500 else markdown_content)
    else:
        print("Failed to scrape profile data")

if __name__ == "__main__":
    main()