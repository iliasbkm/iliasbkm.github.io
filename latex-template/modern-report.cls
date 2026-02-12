\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{modern-report}[2025/01/22 Modern Report Template by Binet]

% Base class
\LoadClass[12pt,a4paper]{report}

% Required packages
\RequirePackage[utf8]{inputenc}
\RequirePackage[T1]{fontenc}
\RequirePackage[french]{babel}
\RequirePackage{geometry}
\RequirePackage{graphicx}
\RequirePackage{xcolor}
\RequirePackage{titlesec}
\RequirePackage{fancyhdr}
\RequirePackage{tikz}
\RequirePackage{tcolorbox}
\RequirePackage{fontspec}
\RequirePackage{setspace}
\RequirePackage{enumitem}
\RequirePackage{hyperref}
\RequirePackage{amsmath,amsfonts,amssymb}
\RequirePackage{microtype}
\RequirePackage{array}
\RequirePackage{booktabs}
\RequirePackage{multirow}
\RequirePackage{lipsum}

% TikZ libraries for geometric shapes
\usetikzlibrary{shapes.geometric,positioning,shadows,decorations.pathmorphing}

% Page geometry
\geometry{
    left=2.5cm,
    right=2.5cm,
    top=3cm,
    bottom=3cm,
    headheight=1.5cm,
    headsep=0.5cm,
    footskip=1cm
}

% Color definitions (brand colors)
\definecolor{emsiBlue}{RGB}{0,70,128}
\definecolor{ramRed}{RGB}{180,0,0}
\definecolor{neutralGray}{RGB}{60,60,60}
\definecolor{lightGray}{RGB}{240,240,240}
\definecolor{modernBlue}{RGB}{41,128,185}
\definecolor{accentBlue}{RGB}{52,152,219}
\definecolor{softGray}{RGB}{149,165,166}
\definecolor{darkGray}{RGB}{44,62,80}
\definecolor{lightAccent}{RGB}{236,240,241}

% Modern typography with fallbacks
\ifxetex
    \setmainfont[
        Path=.,
        UprightFont=*-Regular,
        BoldFont=*-Bold,
        ItalicFont=*-Italic,
        BoldItalicFont=*-BoldItalic
    ]{Lato}
    
    \setsansfont[
        Path=.,
        UprightFont=*-Regular,
        BoldFont=*-Bold,
        ItalicFont=*-Italic,
        BoldItalicFont=*-BoldItalic
    ]{Source Sans Pro}
    
    \setmonofont[Scale=0.9]{Source Code Pro}
\else
    % Fallback for pdfLaTeX
    \RequirePackage{lato}
    \RequirePackage{sourcesanspro}
    \RequirePackage{sourcecodepro}
\fi

% Hyperref setup
\hypersetup{
    colorlinks=true,
    linkcolor=emsiBlue,
    urlcolor=modernBlue,
    citecolor=ramRed,
    pdfborder={0 0 0}
}

% Line spacing
\onehalfspacing

% Title formatting with modern design
\titleformat{\chapter}[display]
{\sffamily\huge\bfseries\color{emsiBlue}}
{\tikz[remember picture,overlay]{
    \fill[emsiBlue!20] (-2,-0.5) rectangle (\textwidth+2,2);
    \fill[emsiBlue] (-2,1.5) rectangle (\textwidth+2,2);
    \node[anchor=west,color=white,font=\sffamily\Large\bfseries] at (0,1.75) {\chaptertitlename\ \thechapter};
}}
{0pt}
{\vspace{-1cm}}
[\vspace{0.5cm}]

\titleformat{\section}
{\sffamily\Large\bfseries\color{emsiBlue}}
{\tikz[baseline=(title.base)]{
    \fill[modernBlue!20] (0,0) rectangle (0.5,0.8);
    \node[anchor=west,inner sep=0pt,outer sep=0pt] (title) at (0.7,0.4) {\thesection};
}}
{0.5em}
{}
[\vspace{0.2cm}\tikz{\draw[modernBlue,line width=2pt] (0,0) -- (\textwidth,0);}]

\titleformat{\subsection}
{\sffamily\large\bfseries\color{darkGray}}
{\tikz[baseline]{
    \fill[accentBlue!30] (0,0) circle (0.15);
    \node[color=white,font=\tiny\bfseries] at (0,0) {\thesubsection};
}}
{0.5em}
{}

% Header and footer
\pagestyle{fancy}
\fancyhf{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

\fancyhead[C]{
    \tikz[remember picture,overlay]{
        \fill[emsiBlue!10] (current page.north west) rectangle ([yshift=-2cm]current page.north east);
        \draw[emsiBlue,line width=2pt] ([yshift=-2cm]current page.north west) -- ([yshift=-2cm]current page.north east);
    }
    \vspace{0.5cm}
    \sffamily\small\color{neutralGray}
    \textbf{\@reporttitle}
}

\fancyfoot[C]{
    \tikz[remember picture,overlay]{
        \fill[lightGray] (current page.south west) rectangle ([yshift=1.5cm]current page.south east);
        \draw[emsiBlue,line width=2pt] ([yshift=1.5cm]current page.south west) -- ([yshift=1.5cm]current page.south east);
    }
    \vspace{0.3cm}
    \sffamily\small\color{neutralGray}
    \thepage
}

% Custom commands for report information
\newcommand{\reporttitle}[1]{\gdef\@reporttitle{#1}}
\newcommand{\reportsubtitle}[1]{\gdef\@reportsubtitle{#1}}
\newcommand{\reportauthor}[1]{\gdef\@reportauthor{#1}}
\newcommand{\reportdate}[1]{\gdef\@reportdate{#1}}
\newcommand{\reportversion}[1]{\gdef\@reportversion{#1}}
\newcommand{\reportclient}[1]{\gdef\@reportclient{#1}}
\newcommand{\reportorganization}[1]{\gdef\@reportorganization{#1}}

% Default values
\gdef\@reporttitle{Rapport Moderne}
\gdef\@reportsubtitle{Template LaTeX Professionnel}
\gdef\@reportauthor{Auteur}
\gdef\@reportdate{\today}
\gdef\@reportversion{Version 1.0}
\gdef\@reportclient{Client}
\gdef\@reportorganization{Organisation}

% Modern cover page command
\newcommand{\makemoderncover}{
    \begin{titlepage}
        \tikz[remember picture,overlay]{
            % Background gradient effect
            \shade[top color=emsiBlue!5,bottom color=lightAccent] 
                (current page.north west) rectangle (current page.south east);
            
            % Top geometric decoration
            \fill[emsiBlue] 
                (current page.north west) -- 
                ([yshift=-3cm]current page.north west) -- 
                ([xshift=8cm,yshift=-1cm]current page.north west) -- 
                ([xshift=8cm]current page.north west) -- cycle;
            
            % Modern geometric shapes
            \fill[modernBlue!40] 
                ([xshift=15cm,yshift=-5cm]current page.north west) circle (2cm);
            \fill[ramRed!30] 
                ([xshift=17cm,yshift=-8cm]current page.north west) 
                rectangle ++(2cm,1cm);
            
            % Bottom geometric decoration
            \fill[accentBlue!20] 
                (current page.south east) -- 
                ([yshift=4cm]current page.south east) -- 
                ([xshift=-10cm,yshift=2cm]current page.south east) -- 
                ([xshift=-10cm]current page.south east) -- cycle;
        }
        
        \vspace*{3cm}
        
        % Logo area (placeholder)
        \begin{center}
            \tikz{
                \fill[emsiBlue] (0,0) circle (1cm);
                \node[color=white,font=\Large\bfseries] at (0,0) {LOGO};
            }
        \end{center}
        
        \vspace{2cm}
        
        % Title section
        \begin{center}
            % Main title with modern styling
            \tikz{
                \node[text width=12cm,align=center] (title) {
                    {\fontsize{28}{34}\selectfont\sffamily\bfseries\color{emsiBlue}\@reporttitle}
                };
                \draw[emsiBlue,line width=3pt,rounded corners=2pt] 
                    ([yshift=-5pt]title.south west) -- ([yshift=-5pt]title.south east);
            }
            
            \vspace{0.8cm}
            
            % Subtitle
            {\Large\sffamily\color{neutralGray}\@reportsubtitle}
            
            \vspace{2cm}
            
            % Information boxes with modern design
            \begin{tikzpicture}
                % Author box
                \node[draw=none,fill=lightAccent,rounded corners=8pt,
                      minimum width=5cm,minimum height=1.5cm,
                      text width=4.8cm,align=center] (author) at (0,0) {
                    {\sffamily\small\color{darkGray}AUTEUR}\\
                    {\sffamily\bfseries\color{emsiBlue}\@reportauthor}
                };
                
                % Client box
                \node[draw=none,fill=lightAccent,rounded corners=8pt,
                      minimum width=5cm,minimum height=1.5cm,
                      text width=4.8cm,align=center] (client) at (6,0) {
                    {\sffamily\small\color{darkGray}CLIENT}\\
                    {\sffamily\bfseries\color{emsiBlue}\@reportclient}
                };
                
                % Date box
                \node[draw=none,fill=lightAccent,rounded corners=8pt,
                      minimum width=5cm,minimum height=1.5cm,
                      text width=4.8cm,align=center] (date) at (0,-2.5) {
                    {\sffamily\small\color{darkGray}DATE}\\
                    {\sffamily\bfseries\color{emsiBlue}\@reportdate}
                };
                
                % Version box
                \node[draw=none,fill=lightAccent,rounded corners=8pt,
                      minimum width=5cm,minimum height=1.5cm,
                      text width=4.8cm,align=center] (version) at (6,-2.5) {
                    {\sffamily\small\color{darkGray}VERSION}\\
                    {\sffamily\bfseries\color{emsiBlue}\@reportversion}
                };
                
                % Connecting lines for modern effect
                \draw[modernBlue!50,line width=1pt,dashed] 
                    (author.east) -- (client.west);
                \draw[modernBlue!50,line width=1pt,dashed] 
                    (author.south) -- (date.north);
                \draw[modernBlue!50,line width=1pt,dashed] 
                    (client.south) -- (version.north);
                \draw[modernBlue!50,line width=1pt,dashed] 
                    (date.east) -- (version.west);
            \end{tikzpicture}
            
            \vspace{3cm}
            
            % Organization
            {\large\sffamily\bfseries\color{neutralGray}\@reportorganization}
            
        \end{center}
        
    \end{titlepage}
    \clearpage
}

% Modern box environments
\newtcolorbox{modernbox}[2][]{
    enhanced,
    colback=lightAccent,
    colframe=emsiBlue,
    boxrule=2pt,
    arc=5pt,
    drop fuzzy shadow,
    left=10pt,
    right=10pt,
    top=10pt,
    bottom=10pt,
    fonttitle=\sffamily\bfseries,
    title=#2,
    #1
}

\newtcolorbox{warningbox}[2][]{
    enhanced,
    colback=ramRed!5,
    colframe=ramRed,
    boxrule=2pt,
    arc=5pt,
    drop fuzzy shadow,
    left=10pt,
    right=10pt,
    top=10pt,
    bottom=10pt,
    fonttitle=\sffamily\bfseries,
    title=#2,
    #1
}

\newtcolorbox{infobox}[2][]{
    enhanced,
    colback=modernBlue!5,
    colframe=modernBlue,
    boxrule=2pt,
    arc=5pt,
    drop fuzzy shadow,
    left=10pt,
    right=10pt,
    top=10pt,
    bottom=10pt,
    fonttitle=\sffamily\bfseries,
    title=#2,
    #1
}

% Modern itemize and enumerate
\setlist[itemize,1]{
    label=\tikz{\fill[emsiBlue] (0,0) circle (0.1cm);},
    leftmargin=0.8cm,
    itemsep=0.2cm
}

\setlist[enumerate,1]{
    label=\tikz{
        \fill[modernBlue!20] (0,0) circle (0.15cm);
        \node[color=modernBlue,font=\tiny\bfseries] at (0,0) {\arabic*};
    },
    leftmargin=0.8cm,
    itemsep=0.2cm
}

% Modern table style
\newcommand{\moderntablehead}[1]{
    \rowcolor{emsiBlue!20}
    \sffamily\bfseries\color{emsiBlue} #1
}

% Custom separator
\newcommand{\modernseparator}{
    \vspace{0.5cm}
    \tikz{
        \draw[emsiBlue,line width=2pt] (0,0) -- (0.3\textwidth,0);
        \draw[modernBlue,line width=1pt] (0.35\textwidth,0) -- (0.65\textwidth,0);
        \draw[accentBlue,line width=0.5pt] (0.7\textwidth,0) -- (\textwidth,0);
    }
    \vspace{0.5cm}
}

\endinput