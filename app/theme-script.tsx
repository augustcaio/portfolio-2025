export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme');
              var systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              var finalTheme = theme || systemTheme || 'light';
              
              if (document.documentElement) {
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add(finalTheme);
              }
            } catch (e) {
              // Fallback para light mode se houver erro
              if (document.documentElement) {
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add('light');
              }
            }
          })();
        `,
      }}
    />
  );
} 