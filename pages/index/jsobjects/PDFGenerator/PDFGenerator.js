export default {
  testFileAccess() {
    try {
      const doc = new jspdf.jsPDF();
      doc.text("Test", 20, 20);
      
      // Проверяем, создается ли blob
      const blob = doc.output('blob');
      console.log("Blob created:", blob);
      console.log("Blob size:", blob.size);
      console.log("Blob type:", blob.type);
      
      // Проверяем URL
      const url = URL.createObjectURL(blob);
      console.log("URL created:", url);
      
      // Проверяем создание элемента
      const a = document.createElement('a');
      console.log("Link element created:", a);
      
      a.href = url;
      a.download = 'test.pdf';
      
      console.log("Link href:", a.href);
      console.log("Link download:", a.download);
      
      // Проверяем клик
      console.log("About to click...");
      a.click();
      console.log("Click executed");
      
      URL.revokeObjectURL(url);
      
      return "File access test completed - check console";
      
    } catch (error) {
      console.error("Error in test:", error);
      return `Error: ${error.message}`;
    }
  },
  
  // Альтернативный метод - показать PDF как Data URI
  showPDFAsDataURI() {
    try {
      const doc = new jspdf.jsPDF();
      
      // Добавляем данные курса
      const courseName = FolderList.selectedItem?.name || 'Курс';
      const planText = WerifiPlan.data?.[0]?.learning_plan || 'План не создан';
      
      doc.setFontSize(16);
      doc.text(`План: ${courseName}`, 20, 20);
      
      doc.setFontSize(12);
      const lines = doc.splitTextToSize(planText, 170);
      doc.text(lines, 20, 40);
      
      // Получаем как data URI
      const dataUri = doc.output('datauristring');
      
      console.log("Data URI length:", dataUri.length);
      console.log("Data URI preview:", dataUri.substring(0, 100));
      
      // Можно скопировать этот URI и вставить в браузер
      showAlert("PDF создан - проверь консоль для Data URI", "success");
      
      return dataUri;
      
    } catch (error) {
      console.error("Error:", error);
      return `Error: ${error.message}`;
    }
  }
}