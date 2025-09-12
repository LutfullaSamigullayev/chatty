export function formatLastSeen(timestamp?: number, isActive?: boolean): string {
    if (isActive) return "Online";
    if (!timestamp) return "Offline";
  
    const d = new Date(timestamp);
    const now = new Date();
  
    // faqat yil, oy, kunni solishtiramiz
    const dDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
    const diffDays = Math.floor(
      (nowDate.getTime() - dDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  
    const timePart = d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  
    if (diffDays === 0) {
      // bugun
      return "Last seen " + timePart;
    } else if (diffDays === 1) {
      // kecha
      return "Last seen yesterday " + timePart;
    } else if (d.getFullYear() === now.getFullYear()) {
      // shu yil ichida
      return (
        "Last seen " +
        d.getDate() +
        "-" +
        d.toLocaleString("en-US", { month: "long" }) +
        " " +
        timePart
      );
    } else {
      // o‘tgan yillar
      return (
        "Last seen " +
        d.getDate() +
        "." +
        (d.getMonth() + 1) +
        "." +
        d.getFullYear() +
        " " +
        timePart
      );
    }
  }
  