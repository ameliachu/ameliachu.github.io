// Function to create the HTML structure
const abv_lookup = {
    "vcbs": "Paramount Global",
    "apfk": "A Place For Kids"
}
function generateAccordionItem(data, index) {
    const accordionItem = document.createElement('div');
    accordionItem.classList.add('accordion-item');

    const accordionHeader = document.createElement('h2');
    accordionHeader.classList.add('accordion-header');
    accordionHeader.setAttribute('id', `flush-heading-${index}`);

    const button = document.createElement('button');
    button.classList.add('accordion-button', 'collapsed');
    button.setAttribute('type', 'button');
    button.setAttribute('data-bs-toggle', 'collapse');
    button.setAttribute('data-bs-target', `#flush-collapse-${index}`);
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', `flush-collapse-${index}`);

    const paragraph = document.createElement('p');
    const strong = document.createElement('strong');
    strong.innerHTML = data.job_title;
    paragraph.appendChild(strong);
    paragraph.innerHTML += '<br>';
    const small = document.createElement('small');
    small.classList.add('text-muted');
    small.innerHTML = `${data.company_city} // ${data.start_month} – ${data.end_month}`;
    paragraph.appendChild(small);

    button.appendChild(paragraph);
    accordionHeader.appendChild(button);

    const accordionCollapse = document.createElement('div');
    accordionCollapse.classList.add('accordion-collapse', 'collapse');
    accordionCollapse.setAttribute('id', `flush-collapse-${index}`);
    accordionCollapse.setAttribute('aria-labelledby', `flush-heading-${index}`);
    accordionCollapse.setAttribute('data-bs-parent', '#resume-experience-professional');

    const accordionBody = document.createElement('div');
    accordionBody.classList.add('accordion-body');

    const bulletList = document.createElement('ul');
    data.bullets.forEach(bullet => {
        const listItem = document.createElement('li');
        listItem.innerHTML = bullet.line;
        bulletList.appendChild(listItem);
    });

    accordionBody.appendChild(bulletList);
    accordionCollapse.appendChild(accordionBody);

    accordionItem.appendChild(accordionHeader);
    accordionItem.appendChild(accordionCollapse);

    return accordionItem;
}

// Fetch the JSON data and generate the accordion items
fetch('resume.json')
    .then(response => response.json())
    .then(allExperience => {
        const parentContainer = document.getElementById('resume-experience-professional');
        // Filter to only include professional section
        const professionalExperience = allExperience.filter(item => item.section === 'professional');
        professionalExperience.forEach((experienceData, index) => {
            parentContainer.appendChild(generateAccordionItem(experienceData, index));
        });
    })
    .catch(error => console.error('Error fetching the JSON data:', error));