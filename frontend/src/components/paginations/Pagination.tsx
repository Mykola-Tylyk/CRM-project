import "./Pagimation.css";

import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalPages }: { totalPages: number }) => {
    const [query, setQuery] = useSearchParams({ page: "1" });
    const currentPage = Number(query.get("page")) || 1;
    const maxVisible = 7;

    const handlePageClick = (page: number) => {
        const currentParams = Object.fromEntries(query.entries());
        if (page !== currentPage) {
            setQuery({
                ...currentParams,
                page: String(page),
            });
        }
    };

    const getPages = (): (number | string)[] => {
        const pages: (number | string)[] = [];

        if (totalPages <= maxVisible) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const half = Math.floor(maxVisible / 2);

        if (currentPage <= half + 1) {
            for (let i = 1; i <= maxVisible; i++) pages.push(i);
            pages.push("...");
            pages.push(totalPages);
        } else if (currentPage >= totalPages - half) {
            pages.push(1);
            pages.push("...");
            for (let i = totalPages - maxVisible + 1; i <= totalPages; i++)
                pages.push(i);
        } else {
            pages.push(1);
            pages.push("...");
            for (
                let i = currentPage - half + 1;
                i <= currentPage + half - 1;
                i++
            )
                pages.push(i);
            pages.push("...");
            pages.push(totalPages);
        }

        return pages;
    };

    const pages = getPages();

    return (
        <ul className="pagination">
            {currentPage > 1 && (
                <li onClick={() => handlePageClick(currentPage - 1)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </li>
            )}

            {pages.map((page, index) =>
                page === "..." ? (
                    <li key={index} className="dots">
                        ...
                    </li>
                ) : (
                    <li
                        key={index}
                        onClick={() => handlePageClick(Number(page))}
                        className={page === currentPage ? "current" : ""}
                    >
                        {page}
                    </li>
                ),
            )}

            {currentPage < totalPages && (
                <li onClick={() => handlePageClick(currentPage + 1)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </li>
            )}
        </ul>
    );
};

export { Pagination };
