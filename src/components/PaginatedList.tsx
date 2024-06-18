import React, { useState } from "react";
import styled from "styled-components";

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ListItem = styled.div`
    width: 100%;
    padding: 15px;
    margin: 10px 0;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .top {
        margin-bottom: 16px;
    }
`;

const Pagination = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

const PageButton = styled.button`
    padding: 8px 16px;
    margin: 0 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

const PageInfo = styled.span`
    margin: 0 10px;
`;

const PaginatedList = ({ data, itemsPerPage }: { data: any[]; itemsPerPage: number }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

    return (
        <ListContainer>
            {currentItems.map((item, index) => (
                <ListItem key={index}>
                    <div>
                        <div className="top">No. {item.id}</div>
                        <div>
                            有效投注金额: <strong>{item.amount}</strong>
                        </div>
                    </div>
                    <div>
                        <div className="top">{item.date}</div>
                        <div>
                            输赢: <strong>{item.win}</strong>
                        </div>
                    </div>
                </ListItem>
            ))}
            <Pagination>
                <PageButton onClick={handlePrevPage} disabled={currentPage === 1}>
                    上一页
                </PageButton>
                <PageInfo>
                    {currentPage}/{totalPages}
                </PageInfo>
                <PageButton onClick={handleNextPage} disabled={currentPage === totalPages}>
                    下一页
                </PageButton>
            </Pagination>
        </ListContainer>
    );
};

export default PaginatedList;
