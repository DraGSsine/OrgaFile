
const fetchPdf = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], 'file.pdf', { type: 'application/pdf' });
    return file;
}


(async () => {
    const pdf = await fetchPdf('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');
    console.log(pdf);
})();