with open('pages/divisions.html', 'r', encoding='utf-8') as f:
    content = f.read()

start = content.find('<nav role="navigation"')
end = content.find('</nav>', start)
nav_right_start = content.find('<div class="nav-right">')
nav_right_end = content.find('</header>')
print(content[nav_right_start:nav_right_end])
