#!/bin/bash

# Modern LaTeX Report Compilation Script
# Supports both XeLaTeX (recommended) and pdfLaTeX compilation

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default settings
INPUT_FILE="sample-report.tex"
ENGINE="xelatex"
CLEAN_AFTER=false
OPEN_PDF=false

# Function to display usage
usage() {
    echo -e "${BLUE}Usage: $0 [OPTIONS] [INPUT_FILE]${NC}"
    echo ""
    echo "OPTIONS:"
    echo "  -e, --engine ENGINE    LaTeX engine to use (xelatex|pdflatex) [default: xelatex]"
    echo "  -c, --clean           Clean auxiliary files after compilation"
    echo "  -o, --open            Open the generated PDF file"
    echo "  -h, --help            Show this help message"
    echo ""
    echo "EXAMPLES:"
    echo "  $0                                    # Compile sample-report.tex with XeLaTeX"
    echo "  $0 -e pdflatex my-report.tex        # Compile with pdfLaTeX"
    echo "  $0 -c -o sample-report.tex          # Compile, clean, and open PDF"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -e|--engine)
            ENGINE="$2"
            shift 2
            ;;
        -c|--clean)
            CLEAN_AFTER=true
            shift
            ;;
        -o|--open)
            OPEN_PDF=true
            shift
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        -*)
            echo -e "${RED}Unknown option $1${NC}"
            usage
            exit 1
            ;;
        *)
            INPUT_FILE="$1"
            shift
            ;;
    esac
done

# Validate engine
if [[ "$ENGINE" != "xelatex" && "$ENGINE" != "pdflatex" ]]; then
    echo -e "${RED}Error: Unsupported engine '$ENGINE'. Use 'xelatex' or 'pdflatex'${NC}"
    exit 1
fi

# Check if input file exists
if [[ ! -f "$INPUT_FILE" ]]; then
    echo -e "${RED}Error: Input file '$INPUT_FILE' not found${NC}"
    exit 1
fi

# Extract base filename without extension
BASE_NAME=$(basename "$INPUT_FILE" .tex)

echo -e "${BLUE}🚀 Compiling LaTeX document: $INPUT_FILE${NC}"
echo -e "${YELLOW}Engine: $ENGINE${NC}"
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if LaTeX engine is available
if ! command_exists "$ENGINE"; then
    echo -e "${RED}Error: $ENGINE is not installed or not in PATH${NC}"
    echo ""
    echo "Installation suggestions:"
    if [[ "$ENGINE" == "xelatex" ]]; then
        echo "  Ubuntu/Debian: sudo apt-get install texlive-xetex"
        echo "  macOS: brew install --cask mactex"
        echo "  Windows: Install MiKTeX or TeX Live"
    else
        echo "  Ubuntu/Debian: sudo apt-get install texlive-latex-base texlive-latex-extra"
        echo "  macOS: brew install --cask mactex" 
        echo "  Windows: Install MiKTeX or TeX Live"
    fi
    exit 1
fi

# Compilation function
compile_document() {
    local pass=$1
    echo -e "${YELLOW}📄 Pass $pass: Running $ENGINE...${NC}"
    
    if [[ "$ENGINE" == "xelatex" ]]; then
        xelatex -interaction=nonstopmode -halt-on-error "$INPUT_FILE"
    else
        pdflatex -interaction=nonstopmode -halt-on-error "$INPUT_FILE"
    fi
    
    if [[ $? -ne 0 ]]; then
        echo -e "${RED}❌ Compilation failed on pass $pass${NC}"
        echo -e "${YELLOW}Check the .log file for detailed error information${NC}"
        exit 1
    fi
}

# Start compilation
echo -e "${GREEN}🔨 Starting compilation process...${NC}"

# First pass
compile_document 1

# Second pass (for table of contents, references, etc.)
echo ""
compile_document 2

# Check if PDF was generated
PDF_FILE="${BASE_NAME}.pdf"
if [[ -f "$PDF_FILE" ]]; then
    echo ""
    echo -e "${GREEN}✅ Compilation successful!${NC}"
    echo -e "${GREEN}📄 Generated: $PDF_FILE${NC}"
    
    # Get file size
    if command_exists "ls"; then
        FILE_SIZE=$(ls -lh "$PDF_FILE" | awk '{print $5}')
        echo -e "${BLUE}📊 File size: $FILE_SIZE${NC}"
    fi
else
    echo -e "${RED}❌ PDF file was not generated${NC}"
    exit 1
fi

# Clean auxiliary files if requested
if [[ "$CLEAN_AFTER" == true ]]; then
    echo ""
    echo -e "${YELLOW}🧹 Cleaning auxiliary files...${NC}"
    
    # List of extensions to clean
    EXTENSIONS=("aux" "log" "toc" "out" "fls" "fdb_latexmk" "synctex.gz" "nav" "snm" "vrb")
    
    for ext in "${EXTENSIONS[@]}"; do
        if [[ -f "${BASE_NAME}.$ext" ]]; then
            rm "${BASE_NAME}.$ext"
            echo -e "   Removed: ${BASE_NAME}.$ext"
        fi
    done
    
    echo -e "${GREEN}✨ Cleanup completed${NC}"
fi

# Open PDF if requested
if [[ "$OPEN_PDF" == true ]]; then
    echo ""
    echo -e "${YELLOW}📖 Opening PDF file...${NC}"
    
    # Cross-platform PDF opening
    if command_exists "xdg-open"; then
        # Linux
        xdg-open "$PDF_FILE" >/dev/null 2>&1 &
    elif command_exists "open"; then
        # macOS
        open "$PDF_FILE"
    elif command_exists "start"; then
        # Windows (Git Bash/WSL)
        start "$PDF_FILE"
    else
        echo -e "${YELLOW}⚠️  Cannot auto-open PDF. Please open $PDF_FILE manually${NC}"
    fi
fi

echo ""
echo -e "${GREEN}🎉 All done! Your modern report is ready.${NC}"

# Display helpful information
echo ""
echo -e "${BLUE}💡 Tips:${NC}"
echo "  • For best results, use XeLaTeX with modern fonts installed"
echo "  • Check README-latex.md for detailed usage instructions"
echo "  • Customize colors and layout in modern-report.cls"
echo ""