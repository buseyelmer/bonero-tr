/** Scroll to career apply section and preselect a role. */
export function goToCareerApply(alan?: string) {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  if (alan) {
    url.searchParams.set("alan", alan);
  } else {
    url.searchParams.delete("alan");
  }
  url.hash = "basvuru";
  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);

  window.dispatchEvent(
    new CustomEvent("career-apply", {
      detail: { alan: alan ?? null },
    }),
  );

  requestAnimationFrame(() => {
    document.getElementById("basvuru")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}
