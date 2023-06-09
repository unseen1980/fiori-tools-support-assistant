const pdfjsLib = require('pdfjs-dist');
const fs = require('fs');
const PDF_PATH = './pdf/';
const TXT_PATH = './documents/';



/*** READ PDF *************************************************************************************/
function readPage (doc, i) {
    return doc.getPage(i)
        .then(page => page.getTextContent())
        .then(content => content.items.map(item => item.str));
}


function readPages (doc, file) {
    const promises = Array
        .from({ length: doc.numPages }, (_, i) => i + 1)
        .map(i => readPage(doc, i));

    return Promise.all(promises);
}


function concatPages (pages) {
    return pages.reduce((a, b) => a.concat(b)).join('\n');
}


function extract (file) {
    return pdfjsLib
        .getDocument({ url: `${PDF_PATH}${file.name}.pdf`, useSystemFonts: true })
        .promise
        .then(doc => readPages(doc, file))
        .then(concatPages)
        .then(txt => cleanup(txt, file))
        .then(txt => save(file, txt));
}
/*** READ PDF *************************************************************************************/




/*** SAVE OUTPUT **********************************************************************************/
function save (file, text) {
    fs.writeFile(`${TXT_PATH}${file.name}.txt`, text, err => {
        if (err) return console.log(err);
        console.log(`- ${file.name} saved`);
    });
}
/*** SAVE OUTPUT **********************************************************************************/




/*** CLEANUP FUNCTIONS ****************************************************************************/
function removeDates (text) {
    return text
        .replace(/(\d{1,2}\/\d{1,2}\/\d{4})/g, '')  // dd/mm/yyyy
        .replace(/(\d{4}\-\d{2}\-\d{2})/g, '');     // yyyy-mm-dd
}


function removeEmptyLines (text) {
    const lines = text.split('\n');
    const newLines = [];
    lines.forEach(line => {
        line = line.trim();
        if (line.length >= 2) newLines.push(line);
        else if (line.match(/[=<>{}()]/)) newLines.push(line);
    });
    return newLines.join('\n');
}


function correctMultiline (text) {
    return text
        .replace(/\/\n\//g, '//')                           // remove line breaks between / and /
        .replace(/\n\./g, '.')                              // remove line breaks before .
        .replace(/->\n/g, '-> ')                            // remove line breaks after ->
        .replace(/\)\n{/g, ') {')                           // remove line breaks between ) and {
        .replace(/\(\n/g, '(').replace(/\n\)/g, ')')        // remove line breaks around ()
        .replace(/\-\n/g, '-').replace(/\n\-/g, '-')        // remove line breaks around -
        .replace(/\n,/g, ',').replace(/,\n/g, ', ')         // remove line breaks around ,
        .replace(/\n:/g, ':').replace(/:\n/g, ': ')         // remove line breaks around :
        .replace(/\n=/g, ' =').replace(/=\n/g, '= ')        // remove line breaks around =
}


function removeWeirdCharacters (text) {
    return text.replace(/ /g, 'fi');
}



function trimText (text, file) {
    const start = file.startFrom ? text.indexOf(file.startFrom) : 0;
    const end = file.endAt ? text.indexOf(file.endAt, start) : text.length;
    return text.substring(start, end).trim();
}


function dropWords (text, file) {
    file.dropWords = file.dropWords || [];
    const drops = [
        'This is custom documentation. For more information, please visit the\nSAP Help Portal\n',
        ...file.dropWords
    ];
    drops.forEach(word => {
        text = text.replace(new RegExp(word, 'g'), '');
    });
    return text.trim();
}


function cleanup (text, file) {
    text = text.normalize();
    text = removeEmptyLines(text);
    text = correctMultiline(text);
    text = removeDates(text);
    text = removeWeirdCharacters(text);
    text = trimText(text, file);
    text = dropWords(text, file);
    text = removeEmptyLines(text);
    return text;
}
/*** CLEANUP FUNCTIONS ****************************************************************************/





const files = [
    {
        name: 'SBASSupportComponents',
        startFrom: 'CA-BAS',
        endAt: 'This is custom documentation',
        dropWords: ['Description', 'Component']
    },
    {
        name: 'SBASDevGuide',
        startFrom: 'Developer Guide\nWith SAP Business Application Studio',
        endAt: 'Troubleshooting\nYou can find solutions for common troubleshooting issues in SAP Business Application Studio',
    },
    {
        name: 'SBAS_components',
        startFrom: 'BAS - SNOW Components',
        dropWords: [
            'Root\nComponent\n',
            'Sub Component\n',
            'Description\n',
            'Selectable/Not\nSelectable\n',
            'Not selectable\n',
            'internal\n',
        ]
    },
    {
        name: 'SAPBTPConnectivityandSupport',
        startFrom: 'Overview\nSAP',
        dropWords: [
            'Back to T\nasks\n',
            'Back to Procedure\n',
        ]
    },
    {
        name: 'FioriToolsDocs',
        startFrom: 'Develop SAP Fiori Applications with SAP Fiori Tools',
    },
    {
        name: 'CloudConnector',
        startFrom: 'Overview\nSAP',
        dropWords: [
            'Back to T\nasks\n',
            'Back to Procedure\n',
            'Back to\nOperations\n',
            'Back to\nop\n',
        ]
    },
    {
        name: 'BTPSupportComponents',
        startFrom: 'Support Components\n',
    },
];



files.forEach(extract);
