const abv_lookup = {
    "vcbs": "Paramount Global",
    "apfk": "A Place For Kids at PS 2",
    "ps130": "America Reads at PS 130",
    "nyu-cmep": "NYU Center of Multicultural Education and Programs (CMEP)",
    "nyu-res": "NYU Residential Life and Housing Services",
    "mcg": "Michael Cohen Group, LLC"
};

// Function to create the HTML structure for each job experience
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
    accordionCollapse.setAttribute('data-bs-parent', `#company-${data.company_abv}`);

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

// Function to create a company abbreviation header
function generateCompanyHeader(abv) {
    const companyHeader = document.createElement('p');
    const strong = document.createElement('strong');
    strong.innerHTML = abv_lookup[abv] || abv;  // Use the lookup or fall back to abv if not found
    companyHeader.appendChild(strong);
    return companyHeader;
}

// Fetch the JSON data and generate the accordion items
fetch('resume.json')
    .then(response => response.json())
    .then(allExperience => {
        const parentContainer = document.getElementById('resume-experience-professional');
        const professionalExperience = allExperience.filter(item => item.section === 'professional');

        let previousCompanyAbv = null;
        let companyContainer = null;

        professionalExperience.forEach((experienceData, index) => {
            if (experienceData.company_abv !== previousCompanyAbv) {
                companyContainer = document.createElement('div');
                companyContainer.setAttribute('id', `company-${experienceData.company_abv}`);
                parentContainer.appendChild(generateCompanyHeader(experienceData.company_abv));
                parentContainer.appendChild(companyContainer);
                previousCompanyAbv = experienceData.company_abv;
            }
            companyContainer.appendChild(generateAccordionItem(experienceData, index));
        });
    })
    .catch(error => console.error('Error fetching the JSON data:', error));
