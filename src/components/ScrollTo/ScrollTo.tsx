interface IScrollToProps {
  scrollToId: string;
  children: React.ReactNode;
}

export function ScrollTo({
  children,
  scrollToId,
}: IScrollToProps): JSX.Element {
  const onClickScrollTo = (): void => {
    const scrollToEl = document.getElementById(scrollToId);
    if (!scrollToEl) return;
    // scroll to element with top offset 100px
    scrollToEl.scrollIntoView({
      behavior: "smooth", // smooth scroll
      block: "center", // "center" vertical alignment
      inline: "center", // "center" horizontal alignment
    });
  };
  return (
    <div className="cursor-pointer" onClick={onClickScrollTo}>
      {children}
    </div>
  );
}
