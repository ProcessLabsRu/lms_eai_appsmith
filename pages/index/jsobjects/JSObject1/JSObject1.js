export default {
  async initializePage() {
    await GetCourses.run();
    if (GetCourses.data?.length > 0) {
      FolderList.selectedItem
    }
  }
}