from bs4 import BeautifulSoup
import requests
import pandas as pd

seq = list(range(1, 1169))

url = 'http://dr.loudness-war.info/album/list/'
urls = []
for x in seq:
    urls.append(url + str(x))

tbl = []
for url in urls:
    print(url)
    r = requests.get(url)
    html = r.text
    soup = BeautifulSoup(html, "html5lib")

    table = soup.findAll('table')[1]
    rows = table.findAll('tr')

    for tr in rows:
        cells = tr.findAll('td')
        for cell in cells:
            artist = cells[0].text.strip()
            album = cells[1].text.strip()
            year = cells[2].text.strip()
            DR = cells[3].text.strip()
            DR_min = cells[4].text.strip()
            DR_max = cells[5].text.strip()
            codec = cells[6].text.strip()
            source = cells[7].text.strip()

            tibble = {'artist': artist, 'album': album, 'year': year, 'DR': DR, 'DR_min': DR_min, 'DR_max': DR_max, 'codec': codec, 'source': source}
            tbl.append(tibble) ## not appending!!??


tib = pd.DataFrame(tbl)
tib = tib[['artist', 'album', 'year', 'DR', 'DR_max', 'DR_min', 'codec', 'source']]
#tib = tib.drop(tib.columns[0], axis = 1)
tib = tib.drop_duplicates()
tib.to_csv('loudness_war.csv', encoding='utf-8')
