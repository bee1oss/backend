function transformRaspData(data) {
    data.forEach(item => {
      const transformedData = {
        time: item.time,
        day: item.day,
        predmet: item.predmet,
        group: item.group,
        teacher: item.teacher,
        room: item.room
      };
  
      console.log("Dönüştürülen veri:", transformedData); // Her öğe için ayrı ayrı dönüştürülen veriyi konsola yaz
  
      // Dönüştürülen veriyi işlemek için burada bir sonraki adımları yapabilirsiniz...
    });
  }
export default transformRaspData;
